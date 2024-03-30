from authapp.forms import CustomUserCreationForm

from django.views.generic import TemplateView
from django.views.generic import FormView

from django.contrib.auth.models import User

from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.contrib.auth import login

from userapp.models import StudentProfile
from userapp.models import TeacherProfile

from django.shortcuts import redirect

from django.http import HttpResponse
from django.http import HttpRequest

from django.urls import reverse_lazy
from django.urls import reverse


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

        username = form.cleaned_data["username"]
        password = form.cleaned_data["password1"]
        email = form.cleaned_data["email"]
        is_teacher = form.cleaned_data["is_teacher"]

        user = User.objects.create_user(username=username, password=password, email=email)

        if is_teacher:
            TeacherProfile.objects.create(user=user)
        else:
            StudentProfile.objects.create(user=user)

        user = authenticate(username=username, password=password)
        login(self.request, user)

        return super(RegisterView, self).form_valid(form)