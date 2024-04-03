from django.contrib.auth.views import PasswordResetCompleteView
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.views import LoginView

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
# from .tasks import send_email_to_reset_password

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
        user = authenticate(
            username=user.username,
            password=form.cleaned_data["password1"],
        )
        login(self.request, user)

        return super(RegisterView, self).form_valid(form)


class MyLoginView(LoginView):

    template_name = "authapp/login.html"
    redirect_authenticated_user = True


class MyPasswordResetView(PasswordResetView):

    template_name = "authapp/password_reset_form.html"
    email_template_name = "authapp/password_reset_email.html"
    success_url = reverse_lazy("authapp:password_reset_done")

    # def form_valid(self, form):
    #     opts = {
    #         "use_https": self.request.is_secure(),
    #         "token_generator": self.token_generator,
    #         "from_email": self.from_email,
    #         "email_template_name": self.email_template_name,
    #         "subject_template_name": self.subject_template_name,
    #         "request": self.request,
    #         "html_email_template_name": self.html_email_template_name,
    #         "extra_email_context": self.extra_email_context,
    #     }
    #
    #     # Вместо сохранения формы, вызываем задачу Celery
    #     send_email_to_reset_password.apply_async(
    #         args=(
    #             opts["subject_template_name"],
    #             opts["email_template_name"],
    #             opts["from_email"],
    #             [form.cleaned_data["email"]],
    #         ),
    #         countdown=1,
    #     )
    #
    #     return super().form_valid(form)


class MyPasswordResetDoneView(PasswordResetDoneView):

    template_name = "authapp/password_reset_done.html"


class MyPasswordResetConfirmView(PasswordResetConfirmView):

    template_name = "authapp/password_reset_confirm.html"
    success_url = reverse_lazy("authapp:password_reset_complete")


class MyPasswordResetCompleteView(PasswordResetCompleteView):

    template_name = "authapp/password_reset_complete.html"
