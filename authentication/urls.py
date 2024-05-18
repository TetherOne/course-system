from django.urls import path

from authentication.views import (
    AboutMeView,
    CurrentUserView,
    MyLoginView,
    MyPasswordResetCompleteView,
    MyPasswordResetConfirmView,
    MyPasswordResetDoneView,
    MyPasswordResetView,
    RegisterView,
    logout_view,
)

app_name = "authentication"


urlpatterns = [
    path(
        "login/",
        MyLoginView.as_view(),
        name="login",
    ),
    path(
        "logout/",
        logout_view,
        name="logout",
    ),
    path(
        "about_me/",
        AboutMeView.as_view(),
        name="about_me",
    ),
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
    path(
        "password-reset/",
        MyPasswordResetView.as_view(),
        name="password_reset",
    ),
    path(
        "password-reset/done/",
        MyPasswordResetDoneView.as_view(),
        name="password_reset_done",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        MyPasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "password-reset/complete/",
        MyPasswordResetCompleteView.as_view(),
        name="password_reset_complete",
    ),
    path(
        "current-user/",
        CurrentUserView.as_view(),
        name="current_user",
    ),
]
