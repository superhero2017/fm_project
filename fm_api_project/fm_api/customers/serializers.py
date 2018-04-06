from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    customer_token = serializers.CharField(
        max_length=50,
        write_only=True,
        help_text='Customer token returned by Stripe.js call from client.'
    )

    def create(self, validated_data):
        data = validated_data
        data.pop('customer_token')

        return Customer.objects.create(**data)

    class Meta:
        model = Customer
        fields = (
            'id',
            'date_created',
            'date_modified',
            'customer_token',

            'billing_card_number',
            'billing_address_1',
            'billing_address_2',
            'billing_city',
            'billing_zip',
            'billing_country',
            'billing_type',
            'billing_expiry_month',
            'billing_expiry_year',
        )

        read_only_fields = ('date_created', 'date_modified',)
