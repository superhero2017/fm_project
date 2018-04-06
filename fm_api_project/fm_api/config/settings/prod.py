from .base import *

ALLOWED_HOSTS = [
    'api.usefeed.me',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'feedme',
        'USER': 'django',
        'PASSWORD': 'django',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# MEDIA_ROOT = '/srv/www/feedme.tech/api/fm_api/media/'
# MEDIA_URL = '/media/'

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
}
