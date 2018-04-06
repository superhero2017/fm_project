from rest_framework import serializers

from .models import Chef as ChefProfile


fields = (
            'id',
            'pending_balance',
            'balance',
            'dob',
            'legal_entity_type',
            'ssn_last_4',
            'address_line_1',
            'address_line_2',
            'city',
            'state',
            'zip',
            'date_created',
            'date_modified',
            'user',
            'bank_name',
            'bank_account_number', # last four digits
            'bank_routing_number',
            'bank_account_status',
            'bank_account_token'
        )
read_only_fields = ('date_created', 'date_modified',)


class UpdateSerializer(serializers.HyperlinkedModelSerializer):
    # Need this to avoid hyperlinked relationship error
    user = serializers.ReadOnlyField(source='user.id')
    bank_account_token = serializers.CharField(
        max_length=50, write_only=True,
        help_text='Bank account token returned by Stripe.js call from client.'
    )

    class Meta:
        model = ChefProfile
        fields = fields
        read_only_fields = read_only_fields


class PayoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ChefProfile
        fields = ()


class CreateSerializer(UpdateSerializer):
    tos_accepted_ip = serializers.IPAddressField(
        write_only=True,
        help_text='IP address that accepted Stripe\'s TOS (https://stripe.com/docs/connect/updating-accounts#tos-acceptance). Returned by call to Stripe.js'
    )

    def create(self, validated_data):
        data = validated_data
        # these don't get saved
        data.pop('tos_accepted_ip', None)
        data.pop('bank_account_token', None)

        return ChefProfile.objects.create(**data)

    class Meta:
        model = ChefProfile
        fields = fields + (
            'tos_accepted_ip',
        )
        read_only_fields = read_only_fields
