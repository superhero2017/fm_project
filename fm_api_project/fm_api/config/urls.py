"""fm_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from api_urls import router
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.authtoken import views
from rest_framework.schemas import get_schema_view
from profiles.views import FacebookLogin

schema_view = get_schema_view(title='FeedMe API', url="http://www.usefeed.me/api")

urlpatterns = [
    # url(r'^api/', include('feedme.urls')),
    # url(r'^api/', include('accounts.urls')),
    url(r'^', include(router.urls)),
    url(r'^profiles/', include('profiles.urls')),
    url(r'^admin/', admin.site.urls),
    # url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^accounts/', include('allauth.urls')),
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += staticfiles_urlpatterns()


urlpatterns += [
    url(r'^auth-token/', views.obtain_auth_token),
    url(r'^docs/$', schema_view),
]