from django.contrib.auth.views import PasswordResetCompleteView
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.views import LoginView

from authapp.views import RegisterView
from authapp.views import AboutMeView
from authapp.views import logout_view

from django.urls import reverse_lazy
from django.urls import path


app_name = "authapp"


urlpatterns = [
    path(
        "login/",
        LoginView.as_view(
            template_name="authapp/login.html",
            redirect_authenticated_user=True,
        ),
        name="login",
    ),
    path(
        "logout/",
        logout_view,
        name="logout",
    ),
    path(
        "about_me/",
        AboutMeView.as_view(template_name="authapp/about_me.html"),
        name="about_me",
    ),
    path(
        "register/",
        RegisterView.as_view(template_name="authapp/register.html"),
        name="register",
    ),
    path(
        "password-reset/",
        PasswordResetView.as_view(
            template_name="authapp/password_reset_form.html",
            email_template_name="authapp/password_reset_email.html",
            success_url=reverse_lazy("authapp:password_reset_done"),
        ),
        name="password_reset",
    ),
    path(
        "password-reset/done/",
        PasswordResetDoneView.as_view(template_name="authapp/password_reset_done.html"),
        name="password_reset_done",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(
            template_name="authapp/password_reset_confirm.html",
            success_url=reverse_lazy("authapp:password_reset_complete"),
        ),
        name="password_reset_confirm",
    ),
    path(
        "password-reset/complete/",
        PasswordResetCompleteView.as_view(
            template_name="authapp/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
]
