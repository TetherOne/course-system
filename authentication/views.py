import django.middleware.csrf
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import (
    LoginView,
    PasswordResetCompleteView,
    PasswordResetConfirmView,
    PasswordResetDoneView,
    PasswordResetView,
)
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from django.views.generic import FormView, TemplateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.forms import CustomPasswordResetForm, CustomUserCreationForm
from authentication.serializers import CurrentUserSerializer

from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def send_csrf_token(req: HttpRequest) -> HttpResponse:
    return HttpResponse()


class AboutMeView(TemplateView):

    template_name = "authentication/about_me.html"


def logout_view(request: HttpRequest) -> HttpResponse:
    logout(request)
    return redirect(reverse("authentication:login"))


class RegisterView(FormView):

    template_name = "authentication/register.html"
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("authentication:about_me")

    def form_valid(self, form):

        user = form.save()

        if user:
            authenticated_user = authenticate(
                username=user.email,
                password=form.cleaned_data["password1"],
            )
            if authenticated_user:
                login(
                    self.request,
                    authenticated_user,
                )
        return super(RegisterView, self).form_valid(form)


class MyLoginView(LoginView):

    template_name = "authentication/login.html"
    redirect_authenticated_user = True


class MyPasswordResetView(PasswordResetView):

    template_name = "authentication/password_reset_form.html"
    email_template_name = "authentication/password_reset_email.html"
    success_url = reverse_lazy("authentication:password_reset_done")
    form_class = CustomPasswordResetForm


class MyPasswordResetDoneView(PasswordResetDoneView):

    template_name = "authentication/password_reset_done.html"


class MyPasswordResetConfirmView(PasswordResetConfirmView):

    template_name = "authentication/password_reset_confirm.html"
    success_url = reverse_lazy("authentication:password_reset_complete")


class MyPasswordResetCompleteView(PasswordResetCompleteView):

    template_name = "authentication/password_reset_complete.html"


class CurrentUserView(APIView):
    def get(self, request) -> HttpResponse:
        serializer = CurrentUserSerializer(request.user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
