from django.contrib.auth.views import PasswordResetCompleteView
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.views import LoginView

from authapp.serializers import CurrentUserSerializer

from rest_framework.response import Response
from rest_framework.views import APIView

from authapp.forms import CustomPasswordResetForm
from authapp.forms import CustomUserCreationForm

from django.views.generic import TemplateView
from django.views.generic import FormView

from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.contrib.auth import login

from django.shortcuts import redirect

from django.http import HttpResponse
from django.http import HttpRequest

from django.urls import reverse_lazy
from django.urls import reverse

from rest_framework import status


class AboutMeView(TemplateView):

    template_name = "authapp/about_me.html"


def logout_view(request: HttpRequest) -> HttpResponse:
    logout(request)
    return redirect(reverse("authapp:login"))


class RegisterView(FormView):

    template_name = "authapp/register.html"
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("authapp:about_me")

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

    template_name = "authapp/login.html"
    redirect_authenticated_user = True


class MyPasswordResetView(PasswordResetView):

    template_name = "authapp/password_reset_form.html"
    email_template_name = "authapp/password_reset_email.html"
    success_url = reverse_lazy("authapp:password_reset_done")
    form_class = CustomPasswordResetForm


class MyPasswordResetDoneView(PasswordResetDoneView):

    template_name = "authapp/password_reset_done.html"


class MyPasswordResetConfirmView(PasswordResetConfirmView):

    template_name = "authapp/password_reset_confirm.html"
    success_url = reverse_lazy("authapp:password_reset_complete")


class MyPasswordResetCompleteView(PasswordResetCompleteView):

    template_name = "authapp/password_reset_complete.html"


class CurrentUserView(APIView):

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
