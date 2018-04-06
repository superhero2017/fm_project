from django.db import models
from rsvps.models import Rsvp
from django.conf import settings


class Customer(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='customer')

    customer_id = models.CharField(max_length=100, verbose_name='Stripe Customer Id')
    billing_card_number = models.CharField(
        max_length=4,
        verbose_name='Last 4 Digits of Card Number',
        help_text='Value should come from Stripe.js call in the client.'
    )
    billing_address_1 = models.CharField(
        max_length=100,
        verbose_name='Billing Address Line 1',
        blank=True,
        help_text='Value can come from Stripe.js call if customer has entered it during account creation.'
    )
    billing_address_2 = models.CharField(
        max_length=100,
        verbose_name='Billing Address Line 2',
        blank=True,
        help_text='Value can come from Stripe.js call if customer has entered it during account creation.'
    )
    billing_city = models.CharField(
        max_length=100,
        verbose_name='Billing City',
        help_text='Value can come from Stripe.js call if customer has entered it during account creation.',
        blank=True
    )
    billing_zip = models.CharField(
        max_length=100,
        verbose_name='Billing Zip Code',
        help_text='Value should come from Stripe.js call in the client.',
    )
    billing_country = models.CharField(
        max_length=100,
        verbose_name='Billing Country',
        help_text='Value should come from Stripe.js call in the client.',
    )
    billing_type = models.CharField(
        max_length=100,
        verbose_name='Card Type',
        help_text='Visa, American Express, MasterCard, Discover, JCB, Diners Club, or Unknown. Value should come from Stripe.js call in the client.',
    )
    billing_expiry_month = models.SmallIntegerField(
        verbose_name='Card Expiry Month',
        help_text='Two digit exiry month. Value should come from Stripe.js call in the client.'
    )
    billing_expiry_year = models.SmallIntegerField(
        verbose_name='Card Expiry Year',
        help_text='Two digit exiry year. Value should come from Stripe.js call in the client.'
    )

    def __str__(self):
        return '{} customer profile'.format(self.user.get_full_name())