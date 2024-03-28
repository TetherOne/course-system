from celery import shared_task
from django.core.cache import caches

@shared_task
def clear_cache():
    cache = caches['default']
    cache.clear()