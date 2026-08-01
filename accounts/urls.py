from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LoginView,
    RequestPasswordResetOTPView,
    ResetPasswordView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("forgot-password/request-otp/", RequestPasswordResetOTPView.as_view(), name="request-otp"),
    path("forgot-password/reset/", ResetPasswordView.as_view(), name="reset-password"),
]