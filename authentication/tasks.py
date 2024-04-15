from django.core.mail import EmailMultiAlternatives

from django.template.loader import render_to_string

from django.utils.html import strip_tags

from django.template import loader

from django.conf import settings

from celery import shared_task


@shared_task()
def send_email_to_reset_password_task(
    subject_template_name,
    email_template_name,
    context,
    from_email,
    to_email,
    html_email_template_name,
):

    subject = loader.render_to_string(
        subject_template_name,
        context,
    )
    subject = "".join(subject.splitlines())
    body = loader.render_to_string(
        email_template_name,
        context,
    )
    email_message = EmailMultiAlternatives(
        subject,
        body,
        from_email,
        [to_email],
    )

    if html_email_template_name is not None:
        html_email = loader.render_to_string(
            html_email_template_name,
            context,
        )
        email_message.attach_alternative(
            html_email,
            "text/html",
        )
    email_message.send()


@shared_task
def send_email_after_registration_task(email):

    subject = "Вас приветствует scart сервис!"
    html_message = render_to_string(
        "authentication/after_registration.html",
    )
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    email = EmailMultiAlternatives(
        subject,
        plain_message,
        from_email,
        to_email,
    )
    email.attach_alternative(
        html_message,
        "text/html",
    )
    email.send(fail_silently=False)
