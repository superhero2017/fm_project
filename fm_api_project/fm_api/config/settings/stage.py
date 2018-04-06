from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    # 'api.dev.usefeed.me',
    'api.stage.feedme.tech'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fm_stage',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        # 'HOST': 'localhost',
        # 'PORT': '5432',
    }
}

# MEDIA_ROOT = '/srv/www/feedme.tech/stage/api/fm_api/media/'
# MEDIA_URL = '/media/'

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=2),
}

STRIPE = {
    'PUBLIC_KEY': 'pk_test_pgtKRb0bhamHi1Vxu3WMhTl1',
    'SECRET_KEY': 'sk_test_pMVhcBSK72MF8EZZNsEFjpD9',
}
