from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from pprint import pprint

# TODO: Find a way to extend these off each other

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    # chef = serializers.ReadOnlyField(source='chef.url')

    class Meta:
        model = Profile
        fields = (
            'url',
            'id',
            'bio',
            'town',
            'image',
            'school',
            'work',
            'user',
            'first_name',
            'last_name',
            # 'chef',
        )

class OwnerProfileSerializer(serializers.HyperlinkedModelSerializer):
    """Serializes the profile instance for the owner.

    Will update first and last name fields on the user object as well."""

    user = serializers.ReadOnlyField(source='user.id')
    email = serializers.ReadOnlyField(source='user.email')
    # Use CharField to modify values
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    # chef = serializers.ReadOnlyField(source='chef.url')

    # Alternative method: Write my own serializer for updating user?
    # Probably necessary for something like changing (and subsequently validating)
    # email address
    def update(self, instance, validated_data):

        user = instance.user
        print(validated_data)
        for updated_field in validated_data['user']:
            value = validated_data['user'][updated_field]
            setattr(user, updated_field, value)

        for updated_field in validated_data:
            if updated_field == 'user':
                for user_field in validated_data['user']:
                    value = validated_data['user'][user_field]
                    setattr(user, user_field, value)
            else:
                value = validated_data[updated_field]
                setattr(instance, updated_field, value)

        user.save()
        instance.save()
        return instance

    class Meta:
        model = Profile
        fields = (
            'url',
            'id',
            'dob',
            'bio',
            'town',
            'gender',
            'image',
            'school',
            'work',
            'user',
            'first_name',
            'last_name',
            'email',
            'chef',
        )


class PublicProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    first_name = serializers.ReadOnlyField(source='user.first_name')

    class Meta:
        model = Profile
        fields = (
            'url',
            'id',
            'bio',
            'town',
            'image',
            'school',
            'work',
            'user',
            'first_name',
        )
