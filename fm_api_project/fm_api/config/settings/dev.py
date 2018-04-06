
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'feedmenow.io',
    'feedmedev.io',
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

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=10),
}

STRIPE = {
    'PUBLIC_KEY': 'pk_test_pgtKRb0bhamHi1Vxu3WMhTl1',
    'SECRET_KEY': 'sk_test_pMVhcBSK72MF8EZZNsEFjpD9',
}
