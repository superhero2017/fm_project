from django.db import models
from django.conf import settings
from django.core.urlresolvers import reverse

# Create your models here.

class Meal(models.Model):
    name = models.CharField(max_length=100, blank=False,)
    description = models.TextField(blank=False,)
    ingredients = models.TextField(blank=False,)
    serving_description = models.TextField(blank=False,)

    servings_offered = models.IntegerField(blank=False, default=2)
    servings_purchased = models.IntegerField(blank=False, default=0)
    # Smallest number of servings one party may purchase
    min_servings = models.IntegerField(blank=False, default=1)
    price = models.IntegerField(blank=False)

    serving_date = models.DateTimeField(blank=False)
    rsvp_date = models.DateTimeField(blank=False)

    accept_delivery = models.BooleanField(default=False)
    accept_pickup = models.BooleanField(default=False)
    accept_dine_in = models.BooleanField(default=False)

    image = models.ImageField(blank=True)

    # Meta date (not supplied by user)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='meals', on_delete=models.CASCADE)
    class Meta:
        ordering = ('date_created',)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.name)

    # def image_url(self):
    #     '''
    #     Returns the url of the image for the model instance.
    #
    #     If no image is found, return the path to the default meal image.
    #     '''
    #     if self.image and hasattr(self.image, 'url'):
    #         return self.image.url
    #     else:
    #         return settings.STATIC_URL + 'img/default/meal.png'


    # def save(self, *args, **kwargs):
    #     """
    #     Add the user to the meal
    #     """
    #     lexer = get_lexer_by_name(self.language)
    #     linenos = self.linenos and 'table' or False
    #     options = self.title and {'title': self.title} or {}
    #     formatter = HtmlFormatter(style=self.style, linenos=linenos,
    #                               full=True, **options)
    #     self.highlighted = highlight(self.code, lexer, formatter)
    #     super(Snippet, self).save(*args, **kwargs)
