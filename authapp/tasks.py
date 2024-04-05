from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail

from django.template import loader

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

    send_mail(
        'Спасибо за регистрацию!',
        'Добро пожаловать! Благодарим вас за регистрацию на нашем сайте.',
        f"{settings.EMAIL_HOST_USER}",
        [email],
        fail_silently=False,
    )