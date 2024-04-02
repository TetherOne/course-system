from django.contrib.auth.forms import UserCreationForm

from django_recaptcha.fields import ReCaptchaField

from userapp.models import StudentProfile
from userapp.models import TeacherProfile

from django import forms


class CustomUserCreationForm(UserCreationForm):

    is_teacher = forms.BooleanField(required=False)
    email = forms.EmailField()
    captcha = ReCaptchaField()

    class Meta(UserCreationForm.Meta):

        fields = UserCreationForm.Meta.fields + (
            "email",
            "is_teacher",
        )
        widgets = {
            "password2": forms.HiddenInput(),
        }

    def __init__(self, *args, **kwargs):
        # убирает повторный ввод пароля при регистрации
        super().__init__(*args, **kwargs)
        self.fields.pop("password2")

    def save(self, commit=True):
        # регистрирует пользователя
        user = super(CustomUserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]

        if commit:
            user.save()
            if self.cleaned_data["is_teacher"]:
                TeacherProfile.objects.create(user=user)
            else:
                StudentProfile.objects.create(user=user)
        return user
