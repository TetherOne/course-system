from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site

from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.forms import UserCreationForm

from .tasks import send_email_after_registration_task
from .tasks import send_email_to_reset_password_task

from django.utils.http import urlsafe_base64_encode

from django_recaptcha.fields import ReCaptchaField

from django.contrib.auth import get_user_model

from django.utils.encoding import force_bytes

from userapp.models import StudentProfile
from userapp.models import TeacherProfile

from .models import CustomUser

from django import forms


UserModel = get_user_model()


class CustomUserCreationForm(UserCreationForm):

    is_teacher = forms.BooleanField(required=False)
    email = forms.EmailField()
    captcha = ReCaptchaField()

    class Meta:

        model = CustomUser
        fields = [
            "username",
            "email",
            "password1",
            "is_teacher",
        ]

    def __init__(self, *args, **kwargs):
        """
        Убирает повторный ввод пароля при регистрации
        """
        super().__init__(*args, **kwargs)
        self.fields.pop("password2")

    def save(self, commit=True):

        user = super(
            CustomUserCreationForm,
            self,
        ).save(commit=False)
        user.email = self.cleaned_data["email"]

        if commit:
            user.save()
            if self.cleaned_data["is_teacher"]:
                TeacherProfile.objects.create(
                    user=user,
                )
            else:
                StudentProfile.objects.create(
                    user=user,
                )
            send_email_after_registration_task.delay(
                user.email,
            )
        return user


class CustomPasswordResetForm(PasswordResetForm):
    """
    Form for recovery password via mail
    """
    def send_mail(
        self,
        subject_template_name,
        email_template_name,
        context,
        from_email,
        to_email,
        html_email_template_name=None,
    ):

        context_dict = {
            "user_email": context["user"].email,
            "domain": context["domain"],
            "site_name": context["site_name"],
            "uid": context["uid"],
            "token": context["token"],
            "protocol": context["protocol"],
        }
        send_email_to_reset_password_task.delay(
            subject_template_name,
            email_template_name,
            context_dict,
            from_email,
            to_email,
            html_email_template_name,
        )

    def save(
        self,
        domain_override=None,
        subject_template_name="registration/password_reset_subject.txt",
        email_template_name="registration/password_reset_email.html",
        use_https=False,
        token_generator=default_token_generator,
        from_email=None,
        request=None,
        html_email_template_name=None,
        extra_email_context=None,
    ):

        email = self.cleaned_data["email"]

        if not domain_override:
            current_site = get_current_site(request)
            site_name = current_site.name
            domain = current_site.domain
        else:
            site_name = domain = domain_override
        email_field_name = UserModel.get_email_field_name()

        for user in self.get_users(email):
            user_email = getattr(user, email_field_name)
            context = {
                "email": user_email,
                "domain": domain,
                "site_name": site_name,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "user": user,
                "token": token_generator.make_token(user),
                "protocol": "https" if use_https else "http",
                **(extra_email_context or {}),
            }
            self.send_mail(
                subject_template_name,
                email_template_name,
                context,
                from_email,
                user_email,
                html_email_template_name=html_email_template_name,
            )
