from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet, base_name="customer")

urlpatterns = [
    url(r'^', include(router.urls)),
]