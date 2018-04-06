from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
# from feedme.views import MealList, MealDetail
from .views import MealViewSet, api_root
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework import renderers
# from rest_framework.schemas import get_schema_view

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'meals', views.MealViewSet, base_name="meal")
# router.register(r'users', views.UserViewSet)

# schema_view = get_schema_view(title='Feedme API')

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    # url('^schema/$', schema_view),
    url(r'^', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls'))
]



# urlpatterns = {
#     url(r'^$', views.api_root),
#     url(r'^meals/$', MealList.as_view(), name="meal-list"),
#     url(r'^meals/(?P<pk>[0-9]+)/$', MealDetail.as_view(), name="meal-detail"),
# }
#
# urlpatterns = format_suffix_patterns(urlpatterns)
