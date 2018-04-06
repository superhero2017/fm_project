from rest_framework import serializers
from .models import Rsvp
# from meals import models
from meals.models import Meal
from pprint import pprint
# from django.contrib.auth.models import User





class RsvpSerializer(serializers.HyperlinkedModelSerializer):

    # print("FOOOOOOOOOOOOOOOO")
    # pprint(vars(meals.models))

    buyer = serializers.ReadOnlyField(source='buyer.username')
    meal = serializers.HyperlinkedRelatedField(
        view_name='meal-detail',
        queryset=Meal.objects.all(),
        # source='meal.id'
        # lookup_field='id',
    )

    # meal = serializers.HyperlinkedIdentityField(
    #     view_name='meal-detail',
    #     # lookup_field='id',
    # )
    # meal_id = serializers.ReadOnlyField()
    # owner_name = serializers.ReadOnlyField(source='owner.first_name')

    class Meta:
        model = Rsvp
        fields = (
            'id',
            'servings',
            'delivery_method',
            'date_created',
            'comments',
            'is_complete',
            'buyer',
            'meal',
        )
        read_only_fields = ('id','date_created',)

        # fields = ('url', 'id', 'highlight', 'owner',
        #           'title', 'code', 'linenos', 'language', 'style')
        # fields = ('url', 'id', 'title', 'owner', 'description', 'rsvp')

    def validate(self, data):
        errors = {}

        # Don't check validity of servings if it's only a parital update and no servings are updated
        if not self.partial and 'servings' in data:
            meal = data['meal']
            if data['servings'] > meal.servings_offered - meal.servings_purchased:
                errors['Servings'] = 'There are not enough servings available'

        if len(errors):
            raise serializers.ValidationError(errors)

        return data
