from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from django.views.generic import TemplateView, FormView

from authapp.forms import CustomUserCreationForm
from userapp.models import TeacherProfile, StudentProfile


class AboutMeView(TemplateView):
    template_name = "authapp/about_me.html"


def logout_view(request: HttpRequest) -> HttpResponse:

    logout(request)

    return redirect(reverse("authapp:login"))


class RegisterView(FormView):

    template_name = 'authapp/register.html'
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("authapp:about_me")

    def form_valid(self, form):

        username = form.cleaned_data['username']
        password = form.cleaned_data['password1']
        is_teacher = form.cleaned_data['is_teacher']

        user = User.objects.create_user(username=username, password=password)

        if is_teacher:
            TeacherProfile.objects.create(user=user)
        else:
            StudentProfile.objects.create(user=user)

        user = authenticate(username=username, password=password)
        login(self.request, user)

        return super(RegisterView, self).form_valid(form)