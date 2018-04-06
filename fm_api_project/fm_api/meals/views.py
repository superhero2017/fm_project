# from django.shortcuts import render
# from feedme.serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
# from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
# from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from pprint import pprint
# from rest_framework.decorators import detail_route
from .models import Meal
from .serializers import MealSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        # 'users': reverse('user-list', request=request, format=format),
        'meals': reverse('meal-list', request=request, format=format)
    })


class MealViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    filter_fields = ('name', 'id',)

    def perform_create(self, serializer):
        pprint(vars(self.request))
        serializer.save(owner=self.request.user)

# class UserViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     This viewset automatically provides `list` and `detail` actions.
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer







# class MealList(generics.ListCreateAPIView):
#     """This class defines the create behavior of our rest api."""
#     queryset = Meal.objects.all()
#     serializer_class = MealSerializer
#
#     def perform_create(self, serializer):
#         """Save the post data when creating a new bucketlist."""
#         serializer.save()
#
#
# class MealDetail(generics.RetrieveUpdateDestroyAPIView):
#     """This class handles the http GET, PUT and DELETE requests."""
#
#     queryset = Meal.objects.all()
#     serializer_class = MealSerializer




#
# class MealDetail(generics.RetrieveUpdateDestroyAPIView):
#     """This class handles the http GET, PUT and DELETE requests."""
#
#     queryset = Meal.objects.all()
#     serializer_class = MealSerializer
