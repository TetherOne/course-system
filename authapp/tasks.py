# import time
#
# from celery import Celery
# from django.core.mail import send_mail
#
# app = Celery('authapp', broker='redis://127.0.0.1:6379/1')
#
#
# @app.task
# def send_email_to_reset_password(subject, message, from_email, recipient_list):
#     send_mail(
#         subject,
#         message,
#         from_email,
#         recipient_list,
#         fail_silently=False,
#     )