from django.contrib import admin

from .models import Rsvp, Payment, Transfer

admin.site.register(Rsvp)
admin.site.register(Payment)
admin.site.register(Transfer)
