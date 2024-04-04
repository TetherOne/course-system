from django import forms
from emailtask.tasks import send_review_email_task


class ReviewForm(forms.Form):
    email = forms.EmailField(
        max_length=200,
        widget=forms.TextInput(
            attrs={
                "class": "form-control mb-3",
                "placeholder": "E-mail",
                "id": "form-email",
            }
        ),
    )

    def send_email(self):
        send_review_email_task.delay(self.cleaned_data["email"])
