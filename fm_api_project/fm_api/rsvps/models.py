from django.db import models
from django.conf import settings
import meals
import stripe
import logging

logger = logging.getLogger(__name__)


# Create your models here.

class Rsvp(models.Model):
    servings = models.IntegerField(blank=False, default=1, help_text="Default is 1")
    delivery_method = models.CharField(max_length=100, blank=False, default='')
    comments = models.TextField(default='', blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False, help_text="Default is False")

    #Cascading deletes is bad in real life
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='meals_purchased', on_delete=models.CASCADE)
    meal = models.ForeignKey('meals.Meal',
                             related_name='rsvps', on_delete=models.CASCADE)

    def update_servings_purchased(self, meal):
        rsvps = meal.rsvps.all()
        if rsvps:
            total = rsvps.aggregate(total=models.Sum('servings')).get('total', 0)
        else:
            total = 0
        meal.servings_purchased = total
        meal.save()

    def transfer_money_to_chef(self):
        stripe.api_key = settings.STRIPE['SECRET_KEY']
        # we need to round since we can get weird repeating, imprecise floats. This is rounded to 2 decimal places
        dollar_amount = round(self.meal.price * self.servings * (1 - settings.CHEF_DEFAULT_SERVICE_FEE), 2)
        try:
            transfer = stripe.Transfer.create(
                amount=int(round(dollar_amount * 100, 0)),  # convert to cents (has to be int)
                currency="usd",
                destination=self.meal.owner.chef_profile.connect_id,
                transfer_group=self.id
            )
        except stripe.error.CardError as e:
            body = e.json_body
            err = body['error']

            param = err['param'] if err['param'] else 'non_field_errors'

            logger.exception('Stripe card error')
            raise RuntimeError(err['message'])
        except (stripe.error.RateLimitError,
                stripe.error.InvalidRequestError,
                stripe.error.AuthenticationError,
                stripe.error.APIConnectionError,
                stripe.error.StripeError
                ) as e:
            logger.exception('Stripe error')

            raise RuntimeError('We encountered a problem with our payment provider. Please try again or contact support.')

        payout = Transfer(rsvp=self, amount=dollar_amount, transfer_id=transfer.id)
        payout.save()

    def save(self, *args, **kwargs):
        if self.is_complete:
            self.transfer_money_to_chef()

        super(Rsvp, self).save(*args, **kwargs)
        self.update_servings_purchased(self.meal)

    def delete(self, *args, **kwargs):
        super(Rsvp, self).delete(*args, **kwargs)
        self.update_servings_purchased(self.meal)

    def __str__(self):
        return "{} purchased {} servings of {}".format(self.buyer.get_full_name(), self.servings, self.meal.name)

    class Meta:
        ordering = ('date_created',)


class Transfer(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    rsvp = models.OneToOneField(Rsvp, related_name='transfer')

    # amount paid out to chef (after fees were subtracted)
    amount = models.DecimalField(max_digits=6, decimal_places=2)  # max value $9999.99

    transfer_id = models.CharField(max_length=40, verbose_name='Stripe Transfer Id')

    paid_out = models.BooleanField(default=False)  # Whether money was transferred to chef's bank account
    payout_id = models.CharField(max_length=100, verbose_name='Stripe Payout Id')

    def transfer_group(self):
        # transfer group isn't explicitly needed since Payment and Transfer have a common
        # rsvp.id which can be used to match payments with payouts
        return self.rsvp.id

    def __str__(self):
        return '{} received ${}'.format(self.rsvp.meal.owner.get_full_name(), self.amount)


class Payment(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    rsvp = models.OneToOneField(Rsvp, related_name='payment')

    # amount paid out to chef (after fees were subtracted)
    amount = models.DecimalField(max_digits=6, decimal_places=2)  # max value $9999.99

    charge_id = models.CharField(max_length=40, verbose_name='Stripe Charge Id')

    def transfer_group(self):
        # transfer group isn't explicitly needed since Payment and Transfer have a common
        # rsvp.id which can be used to match payments with payouts
        return self.rsvp.id


    def __str__(self):
        return '{} paid ${}'.format(self.rsvp.buyer.get_full_name(), self.amount)
