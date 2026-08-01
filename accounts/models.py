from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta


class CustomUser(AbstractUser):
    phone_regex = RegexValidator(
        regex=r"^\d{10}$",
        message="Phone number must be exactly 10 digits."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=15, unique=True)

    def __str__(self):
        return self.username


class PasswordResetOTP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="reset_otps")
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=10)

    def __str__(self):
        return f"OTP for {self.user.username} ({'used' if self.is_used else 'active'})"