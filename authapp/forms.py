from django.contrib.auth.forms import UserCreationForm

from django import forms


class CustomUserCreationForm(UserCreationForm):

    is_teacher = forms.BooleanField(required=False)

    class Meta(UserCreationForm.Meta):

        fields = UserCreationForm.Meta.fields + ("is_teacher",)
        widgets = {
            "password2": forms.HiddenInput(),
        }

    def __init__(self, *args, **kwargs):
        # убирает повторный ввод пароля при регистрации
        super().__init__(*args, **kwargs)
        self.fields.pop("password2")
