from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from .models import Rsvp, Payment, Transfer
from .serializers import RsvpSerializer
from rest_framework import status, mixins
from rest_framework.viewsets import GenericViewSet
from customers.models import Customer
import stripe
from django.conf import settings
from .permissions import RsvpPermissions
from rest_framework.decorators import detail_route
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        # 'users': reverse('user-list', request=request, format=format),
        'rsvps': reverse('rsvp-list', request=request, format=format)
    })


class RsvpViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    """
    list: List all rsvps for authenticated user. Required fields are marked as such.
    create: Create rsvp for a user. Required fields are marked as such.
    retrieve: Get rsvp. Only the rsvp created by logged in user can be retrieved.
    complete: Mark rsvp as completed. This transfer money for Rsvp to chef's Stripe account.
    """

    queryset = Rsvp.objects.all()
    serializer_class = RsvpSerializer
    permission_classes = (RsvpPermissions,)

    def get_queryset(self):
        if self.action == 'list':
            return Rsvp.objects.filter(buyer=self.request.user)

        return Rsvp.objects.all()


    def create(self, request, *args, **kwargs):
        # if customer (aka buyer) has no Customer object, return error saying such
        # get request.user's Customer object
        # get customer_id of Customer and run Stripe charge for rsvp.amount
        # if successful, save payment, otherwise return error

        serializer = RsvpSerializer(data=request.data, context={'request': request})
        errors = {}

        if serializer.is_valid(raise_exception=True):
            rsvp = serializer.save(buyer=request.user)

        try:
            customer_id = request.user.customer.customer_id
        except Customer.DoesNotExist as e:
            errors['non_field_errors'] = ['No payment information avialable.']
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        amount = rsvp.meal.price * rsvp.servings

        try:
            stripe.api_key = settings.STRIPE['SECRET_KEY']
            charge_results = stripe.Charge.create(
                amount=amount * 100, # in cents
                currency="usd",
                customer=customer_id,
                description=rsvp.meal.name,
                transfer_group=rsvp.id
            )
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

        payment = Payment(rsvp=rsvp, amount=amount, charge_id=charge_results.id)
        payment.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @detail_route(methods=['patch'])
    def complete(self, request, *args, **kwargs):
        rsvp = self.get_object()
        serializer = self.get_serializer(rsvp, data=request.data, partial=True)
        # we need to round since we can get weird repeating, imprecise floats. This is rounded to 2 decimal places
        # Calcluate our fee and tell stripe to give the rest to the chef
        dollar_amount = round(rsvp.meal.price * rsvp.servings * (1 - settings.CHEF_DEFAULT_SERVICE_FEE), 2)
        if serializer.is_valid(raise_exception=True):
            # create payout to chef if is_complete is set
            if serializer.validated_data['is_complete']:
                stripe.api_key = settings.STRIPE['SECRET_KEY']
                try:
                    transfer = stripe.Transfer.create(
                        amount= int(round(dollar_amount * 100, 0)),  # convert to cents (has to be int)
                        currency="usd",
                        destination=rsvp.meal.owner.chef_profile.connect_id,
                        transfer_group=rsvp.id
                    )
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

                payout = Transfer(rsvp=rsvp, amount=dollar_amount, transfer_id=transfer.id)
                payout.save()

            self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
