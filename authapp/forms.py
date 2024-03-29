from django.contrib.auth.forms import UserCreationForm

from django import forms


class CustomUserCreationForm(UserCreationForm):

    is_teacher = forms.BooleanField(required=False)

    class Meta(UserCreationForm.Meta):

        fields = UserCreationForm.Meta.fields + ('is_teacher',)