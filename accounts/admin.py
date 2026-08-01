
from django.contrib import admin
from .models import CustomUser, PasswordResetOTP

admin.site.register(CustomUser)
admin.site.register(PasswordResetOTP)