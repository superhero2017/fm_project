from rest_framework import mixins
# from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.response import Response
import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Chef
from .serializers import UpdateSerializer, CreateSerializer, PayoutSerializer
from rest_framework.decorators import detail_route
from rsvps.models import Transfer
from django.db.models import Sum
from decimal import Decimal
from rest_framework import permissions
from config.permissions import AllCreateOwnerUpdateOwnerRetrieve
import logging
from datetime import datetime
from rest_framework.viewsets import GenericViewSet

logger = logging.getLogger(__name__)


class ChefViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """
    list: List all chefs. Only available to super-users. Required fields are marked as such.
    create: Create chef for a user. Required fields are marked as such.
    retrieve: Get chef. Only the chef created by logged in user can be retrieved.
    partial_update: Update chef. Any field can be updated and only id is required.
    update: Update chef. Required fields are marked as such.
    payout: Transfer remaining amount to chef's bank account.
    """

    queryset = Chef.objects.all()
    permission_classes = (AllCreateOwnerUpdateOwnerRetrieve,)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateSerializer
        elif self.action == 'update':
            return UpdateSerializer
        elif self.action == 'payout':
            return PayoutSerializer

        return UpdateSerializer

    def create(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE['SECRET_KEY']

        serializer = CreateSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # create Stripe Connect account
            dob = serializer.validated_data['dob']
            try:
                connect_account = stripe.Account.create(
                    type='custom',
                    country='US',
                    email=request.user.email,
                    payout_schedule={
                        'interval': 'manual'  # we trigger Chef pay outs manually
                    },
                    legal_entity={
                        'first_name': request.user.first_name,
                        'last_name': request.user.last_name,
                        'type': 'individual' if not serializer.validated_data['legal_entity_type'] else serializer.validated_data['legal_entity_type'],
                        'dob': {
                            'day': dob.day,
                            'month': dob.month,
                            'year': dob.year
                        },
                        'address': {
                            'city': serializer.validated_data['city'],
                            'line1': serializer.validated_data['address_line_1'],
                            'postal_code': serializer.validated_data['zip'],
                            'state': serializer.validated_data['state']
                        },
                        'ssn_last_4': serializer.validated_data['ssn_last_4'],
                    },
                    tos_acceptance={
                        'date': int(datetime.now().timestamp()),
                        'ip': serializer.validated_data['tos_accepted_ip']
                    }
                )
            except stripe.error.CardError as e:
                # probably don't need to handle this specifically here but Stripe says it's most common *shrug*
                body = e.json_body
                err = body['error']

                param = err['param'] if err['param'] else 'non_field_errors'

                logger.exception('Stripe card error')
                return Response({param: err['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except (stripe.error.RateLimitError,
                    stripe.error.InvalidRequestError,
                    stripe.error.AuthenticationError,
                    stripe.error.APIConnectionError,
                    stripe.error.StripeError
                    ) as e:
                logger.exception('Stripe error')

                return Response(
                    {
                        'non_field_errors':
                            'We encountered a problem with our payment provider. Please try again or contact support.'
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            try:
                # create Stripe Bank Account
                bank_account = connect_account.external_accounts.create(external_account=serializer.validated_data['bank_account_token'])
            except stripe.error.CardError as e:
                body = e.json_body
                err = body['error']

                param = err['param'] if err['param'] else 'non_field_errors'

                logger.exception('Stripe card error')
                return Response({param: err['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except (stripe.error.RateLimitError,
                    stripe.error.InvalidRequestError,
                    stripe.error.AuthenticationError,
                    stripe.error.APIConnectionError,
                    stripe.error.StripeError
                    ) as e:
                logger.exception('Stripe error')

                return Response(
                    {
                        'non_field_errors':
                            'We encountered a problem with our payment provider. Please try again or contact support.'
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            serializer.save(user=request.user, bank_account_id=bank_account.id, connect_id=connect_account.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE['SECRET_KEY']

        chef = self.get_object()
        serializer = UpdateSerializer(instance=chef, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            # fetch stripe account
            stripe_account = stripe.Account.retrieve(chef.connect_id)
            # update data as required
            if 'dob' in serializer.validated_data:
                dob = serializer.validated_data['dob']
                stripe_account.legal_entity['dob'] = {
                            'day': dob.day,
                            'month': dob.month,
                            'year': dob.year
                        }

            if 'city' in serializer.validated_data:
                stripe_account.legal_entity['address']['city'] = serializer.validated_data['city']
            if 'address_line_1' in serializer.validated_data:
                stripe_account.legal_entity['address']['line1'] = serializer.validated_data['address_line_1']
            if 'zip' in serializer.validated_data:
                stripe_account.legal_entity['address']['postal_code'] = serializer.validated_data['zip']
            if 'state' in serializer.validated_data:
                stripe_account.legal_entity['address']['state'] = serializer.validated_data['state']

            if 'ssn_last_4' in serializer.validated_data:
                stripe_account.legal_entity['ssn_last_4'] = serializer.validated_data['ssn_last_4']
            if 'legal_entity_type' in serializer.validated_data:
                stripe_account.legal_entity['type'] = serializer.validated_data['legal_entity_type']

            stripe_account.save()  # save back to stripe

            # if bank_account_token provided, remove old bank account
            if 'bank_account_token' in serializer.validated_data:
                try:
                    # create new stripe bank account
                    bank_account = stripe_account.external_accounts.create(
                        external_account=serializer.validated_data['bank_account_token'], default_for_currency=True)
                    # delete old one
                    stripe_account.external_accounts.retrieve(chef.bank_account_id).delete()
                    # set new id to be saved into chef
                    chef.bank_account_id = bank_account.id
                except stripe.error.CardError as e:
                    body = e.json_body
                    err = body['error']

                    param = err['param'] if err['param'] else 'non_field_errors'

                    logger.exception('Stripe card error')
                    return Response({param: err['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                except (stripe.error.RateLimitError,
                        stripe.error.InvalidRequestError,
                        stripe.error.AuthenticationError,
                        stripe.error.APIConnectionError,
                        stripe.error.StripeError
                        ) as e:
                    logger.exception('Stripe error')

                    return Response(
                        {
                            'non_field_errors':
                                'We encountered a problem with our payment provider. Please try again or contact support.'
                        },
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            serializer.update(instance=chef, validated_data=serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

    @detail_route(methods=['patch'])
    def payout(self, request, *args, **kwargs):
        chef = self.get_object()

        # payout `balance`. Pending balance should not be paid out as it includes Transfers less than 7 days old
        unpaid_transfers = chef.balance_query()
        owed_amount = chef.balance()
        pending_amount = chef.pending_balance()  # NOT to be paid out... this can be shown to user
        if owed_amount == 0:
            return Response(
                {'non_field_error': 'No outstanding balance exists. Balance under review: ${0}'.format(pending_amount)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # attempt to pay owed.amount
        stripe.api_key = settings.STRIPE['SECRET_KEY']
        try:
            payout = stripe.Payout.create(
                amount=int(round((owed_amount * 100), 0)),  # in cents
                currency="usd",
                stripe_account=chef.connect_id,
                destination=chef.bank_account_id,
                statement_descriptor='FeedMe payment' # must be less than 22 chars
            )
        except stripe.error.CardError as e:
            # probably don't need to handle this specifically here but Stripe says it's most common *shrug*
            body = e.json_body
            err = body['error']

            param = err['param'] if err['param'] else 'non_field_errors'

            logger.exception('Stripe card error')
            return Response({param: err['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except (stripe.error.RateLimitError,
                stripe.error.InvalidRequestError,
                stripe.error.AuthenticationError,
                stripe.error.APIConnectionError,
                stripe.error.StripeError
                ) as e:
            logger.exception('Stripe error')

            return Response(
                {
                    'non_field_errors':
                        'We encountered a problem with our payment provider. Please try again or contact support.'
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # set transfer to paid_out to True
        unpaid_transfers.update(payout_id=payout.id, paid_out=True)

        return Response(status=status.HTTP_200_OK)



