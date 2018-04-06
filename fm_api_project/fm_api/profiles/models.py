from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
# from django_enumfield import enum
from allauth.utils import generate_unique_username
from allauth.socialaccount.signals import social_account_added
from allauth.socialaccount.models import SocialAccount

# Properties that facebook gives us and what we call them in Profile model
facebook_to_profile_map = {
    'gender': 'gender'
}


class Profile(models.Model):

    def profile_directory_path(instance, filename):
        return 'profiles/user_{0}/{1}'.format(instance.user.id, filename)

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='profile')
    # user = models.OneToOneField(settings.AUTH_USER_MODEL)
    town = models.CharField(max_length=100, default='')
    gender = models.CharField(max_length=10, default='')
    dob = models.DateField(blank=True, null=True)
    bio = models.TextField(default='')
    image = models.ImageField(blank=True, upload_to=profile_directory_path)

    # "Optional" fields
    school = models.CharField(max_length=255, default="")
    work = models.CharField(max_length=255, default="")
    chef = models.BooleanField(default=False)


def create_profile(sender, **kwargs):
    user = kwargs["instance"]
    # print("CREATE_PROFILE")
    # print(kwargs)
    # print("")
    if kwargs["created"]:
        profile = Profile(user=user,)
        # print(repr(profile))
        profile.save()


def populate_username(user):
    first_name = user.first_name
    last_name = user.last_name
    email = user.email
    return generate_unique_username([
            first_name,
            last_name,
            email,
            'user'])


def set_username(sender, **kwargs):
    user = kwargs["instance"]
    if user.username == "":
        user.username = populate_username(user)
        user.save()


def update_profile_with_fb_data(sender, **kwargs):
    socialaccount = kwargs['instance']
    for fb_prop_name in socialaccount.extra_data.keys():
        profile_prop_name = facebook_to_profile_map[fb_prop_name] if fb_prop_name in facebook_to_profile_map else None
        if profile_prop_name:
            value = socialaccount.extra_data[fb_prop_name]
            setattr(socialaccount.user.profile, profile_prop_name, value)
    socialaccount.user.profile.save()


post_save.connect(create_profile, sender=settings.AUTH_USER_MODEL)
post_save.connect(set_username, sender=settings.AUTH_USER_MODEL)
post_save.connect(update_profile_with_fb_data, sender=SocialAccount)