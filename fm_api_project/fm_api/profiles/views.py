from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from .models import Profile
from .serializers import ProfileSerializer, PublicProfileSerializer, OwnerProfileSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from pprint import pprint
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

def get_serializer(request, profile):
    """
    Return the correct serializer based on the authentication level and
    ownership of the requested profile.
    """
    if request.user == profile.user:
        return OwnerProfileSerializer
    elif request.user.is_authenticated():
        return ProfileSerializer
    return PublicProfileSerializer

class ProfileList(APIView):
    """
    List all Profiles. Only available to admin users.
    """
    permission_classes = (permissions.IsAdminUser, )
    serializer_class = ProfileSerializer

    def get(self, request, format=None):
        profiles = Profile.objects.all()

        # Only admins can access this
        serializer = OwnerProfileSerializer(
            profiles,
            many=True,
            context={"request": request},
        )
        print(repr(serializer))
        return Response(serializer.data)

class ProfileDetail(APIView):
    """
    Retrieve or update a profile instance.
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # Gives the html form for modifying it as the owner
    serializer_class = OwnerProfileSerializer

    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        profile = self.get_object(pk)

        Serializer = get_serializer(request, profile)
        serializer = Serializer(
            profile,
            context={"request": request},
        )
        return Response(serializer.data)

    # Only allow owners to update a profile
    def put(self, request, pk, format=None):
        # permission_classes = (permissions.IsAuthenticated, )
        profile = self.get_object(pk)
        if request.user != profile.user:
            raise PermissionDenied
        # self.check_object_permissions(self.request, profile)
        serializer = OwnerProfileSerializer(
            profile,
            data=request.data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter