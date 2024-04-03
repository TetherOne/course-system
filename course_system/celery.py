from __future__ import unicode_literals
from __future__ import absolute_import

from celery import Celery

import os


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "course_system.settings")

app = Celery("course_system")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()