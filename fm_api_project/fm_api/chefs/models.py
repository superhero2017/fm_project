from django.db import models
from django.conf import settings
from rsvps.models import Rsvp
from rsvps.models import Transfer
from django.db.models import Sum
from datetime import datetime, timedelta
from decimal import Decimal
from django.utils import timezone

LEGAL_ENTITY_TYPES = (('individual', 'individual'), ('company', 'company'),)


class Chef(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='chef_profile')

    dob = models.DateField(
        verbose_name='Date of Birth',
        blank=True,
        help_text='Date of birth in format: yyyy-mm-dd. For example: 1994-07-13'
    )
    legal_entity_type = models.CharField(choices=LEGAL_ENTITY_TYPES, max_length=10, default=LEGAL_ENTITY_TYPES[0][0],
                                         help_text='\'individual\' is the default')
    ssn_last_4 = models.CharField(
        max_length=4,
        blank=True,
        help_text='Last 4 digits of Social Security Number'
    )
    address_line_1 = models.CharField(
        max_length=100,
        help_text='First line of address'
    )
    address_line_2 = models.CharField(
        max_length=100,
        blank=True,
        help_text = 'Second line of address'
    )
    city = models.CharField(
        max_length=100
    )
    state = models.CharField(
        max_length=100
    )
    zip = models.CharField(
        max_length=100,
        verbose_name='Zip Code',
        help_text='Zip or Postal Code'
    )

    connect_id = models.CharField(max_length=40, verbose_name='Stripe Connect Account Id',)
    bank_account_id = models.CharField(max_length=40, verbose_name='Stripe Bank Account (Source) Id',)
    bank_name = models.CharField(max_length=100, verbose_name='Bank Name',
                                 help_text='Value should come from Stripe.js call in the client.')
    bank_account_number = models.CharField(max_length=4, verbose_name='Last 4 digits of account number',
                                           help_text='Value should come from Stripe.js call in the client.')
    bank_routing_number = models.CharField(max_length=50, verbose_name='Bank Rounting Number',
                                           help_text='Value should come from Stripe.js call in the client.')
    bank_account_status = models.CharField(max_length=30, verbose_name='Stripe Bank Account Status',
                                           help_text='Value should come from Stripe.js call in the client.')

    def _pending_balance_query(self):
        """Get query for pending balance calculation."""

        return Transfer.objects.filter(rsvp__meal__owner=self.user, paid_out=False)

    def balance_query(self):
        pending_balance_query = self._pending_balance_query()
        now = datetime.now(tz=timezone.get_current_timezone())
        seven_days_ago = now - timedelta(days=7)

        return pending_balance_query.filter(
            date_created__lt=seven_days_ago # date (number) should be less than now - 7 days)
        )

    def balance(self):
        """Approved amount of money chef is owed.

        This only includes amount that can be paid out. The approved criteria currently is Rsvps paid 7 or more days ago.
        """

        unpaid_transfers = self.balance_query()
        owed = unpaid_transfers.aggregate(amount=Sum('amount'))
        # owed can be null or an int. Let's ensure it's always a Decimal
        amount = Decimal(0.00) if type(owed['amount']) != Decimal or owed['amount'] == 0 else owed['amount']
        return amount

    def pending_balance(self):
        """Total balance owed to chef. This cannot be paid out but rather `balance` should be paid out.

        Pending balance includes all rsvps (including those paid within 7 days).
        """

        unpaid_transfers = self._pending_balance_query()
        owed = unpaid_transfers.aggregate(amount=Sum('amount'))
        # owed can be null or an int. Let's ensure it's always a Decimal
        amount = Decimal(0.00) if type(owed['amount']) != Decimal or owed['amount'] == 0 else owed['amount']
        return amount

    def __str__(self):
        return '{} at {}'.format(self.user.get_full_name(), self.bank_name)
