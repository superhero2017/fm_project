from rest_framework import serializers
from .models import Meal
from django.contrib.auth.models import User
from pprint import pprint





class MealSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    owner_name = serializers.ReadOnlyField(source='owner.first_name')
    # image_url = serializers.ReadOnlyField(source='image_url')
    servings_available = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = (
            'url',
            'id',
            'owner',
            'name',
            'description',
            'ingredients',
            'serving_description',
            'servings_available',
            'servings_offered',
            'min_servings',
            'price',
            'serving_date',
            'rsvp_date',
            'accept_delivery',
            'accept_pickup',
            'accept_dine_in',
            'image',
            'date_created',
            'date_modified',
            'owner_name',
        )
        read_only_fields = ('date_created', 'date_modified',)

    def get_servings_available(self, meal):
        # pprint(meal.rsvps_set.all())
        # servings_reserved = 0
        # rsvps = meal.rsvps.all()
        # for rsvp in rsvps:
        #     servings_reserved += rsvp.servings
        #
        # print(servings_reserved)

        return meal.servings_offered - meal.servings_purchased

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be a positive number")
        return value

    def validate_servings_offered(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "You must offer a positive number of servings"
            )
        return value


    def validate(self, data):
        errors = {}

        # Make sure there is a delivery method
        if not (data['accept_delivery'] or
                data['accept_pickup'] or
                data['accept_dine_in']):
            errors['Delivery Method'] = "You must choose a delivery method"

        # Check if servings offered and min are correct
        if data['min_servings'] > data['servings_offered']:
            errors['Servings'] = "Servings per customer \
                cannot be greater than the total servings offered"

        if data['rsvp_date'] > data['serving_date']:
            errors['Dates'] = "The RSVP date must be before the serving date"

        if len(errors):
            raise serializers.ValidationError(errors)

        return data

        # fields = ('url', 'id', 'highlight', 'owner',
        #           'title', 'code', 'linenos', 'language', 'style')
        # fields = ('url', 'id', 'title', 'owner', 'description', 'rsvp')


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     meals = serializers.HyperlinkedRelatedField(many=True, view_name='meal-detail', read_only=True)
#
#     class Meta:
#         model = User
#         fields = ('url', 'id', 'username', 'meals')
#

# class MealSerializer(serializers.ModelSerializer):
#     """Serializer to map the Model instance into JSON format."""
#
#     class Meta:
#         """Meta class to map serializer's fields with the model fields."""
#         model = Meal
#         fields = ('id', 'name', 'date_created', 'date_modified',
#                   'description', 'rsvp')
#         read_only_fields = ('date_created', 'date_modified')

## Primary key fields
# class SnippetSerializer(serializers.Serializer):
#     owner = serializers.ReadOnlyField(source='owner.username')
#     class Meta:
#         model= Snippet
#         fields = ('id', 'title', 'owner', 'code', 'linenos', 'language', 'style')
#
#
# class UserSerializer(serializers.ModelSerializer):
#     snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
#
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'snippets')
