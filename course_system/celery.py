from __future__ import absolute_import, unicode_literals

import os

from celery import Celery


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "course_system.settings",
)

app = Celery(
    "course_system",
    broker="amqp://guest:guest@rabbitmq:5672",
    backend="rpc://",
)

app.config_from_object(
    "django.conf:settings",
    namespace="CELERY",
)

app.autodiscover_tasks()
