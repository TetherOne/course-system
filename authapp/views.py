from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, TemplateView


class AboutMeView(TemplateView):
    template_name = "authapp/about_me.html"


def logout_view(request: HttpRequest) -> HttpResponse:

    logout(request)

    return redirect(reverse("authapp:login"))

#
class RegisterView(CreateView):
    form_class = UserCreationForm
    template_name = "authapp/register.html"
    success_url = reverse_lazy("authapp:about_me")

    def form_valid(self, form):
        response = super().form_valid(form)

        username = form.cleaned_data["username"]
        password = form.cleaned_data["password1"]
        user = authenticate(self.request, username=username, password=password)
        login(request=self.request, user=user)
        return response