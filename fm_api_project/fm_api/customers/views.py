# from rest_framework import mixins
# from rest_framework import renderers
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
import stripe
from django.conf import settings
from rest_framework import status
from pprint import pprint

# from rest_framework.decorators import detail_route
from .models import Customer
from .serializers import CustomerSerializer
from config.permissions import AllCreateOwnerUpdateOwnerRetrieve
import logging

logger = logging.getLogger(__name__)


class CustomerViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """
    list: List all customers. Only available to super-users. Required fields are marked as such.
    create: Create customer for a user. Required fields are marked as such.
    retrieve: Get customer. Only the customer created by logged in user can be retrieved.
    partial_update: Update customer. Any field can be updated only id is required.
    update: Update customer. Required fields are marked as such.
    """

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = (AllCreateOwnerUpdateOwnerRetrieve,)

    def retrieve(self, request, *args, **kwargs):
        userId = request.user
        print("ARGS")
        print(kwargs['pk'])
        print(request.user.id)

        # Give the customer object if the id
        # matches the id of the user


        if str(kwargs['pk']) == str(request.user.id):
            serializer = CustomerSerializer(
                request.user.customer
            )
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        else:
            return Response({
                    'non_field_errors': "You do not have permission"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE['SECRET_KEY']

        serializer = CustomerSerializer(data=request.data, context={'request': request})

        if serializer.is_valid(raise_exception=True):
            try:
                customer = stripe.Customer.create(
                    description=request.user.email,
                    source=serializer.validated_data['customer_token']
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

            serializer.save(user=request.user, customer_id=customer.id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE['SECRET_KEY']

        customer = self.get_object()

        serializer = CustomerSerializer(instance=customer, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            # if new customer_token is provided, delete old stripe customer and create a new one
            if 'customer_token' in serializer.validated_data:
                try:
                    # delete old customer
                    stripe.Customer.retrieve(customer.customer_id).delete()
                    # create new one
                    stripe_customer = stripe.Customer.create(
                        description=request.user.email,
                        source=serializer.validated_data['customer_token']
                    )
                    customer.customer_id = stripe_customer.id
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

            serializer.update(instance=customer, validated_data=serializer.validated_data)

            return Response(serializer.data, status=status.HTTP_200_OK)
