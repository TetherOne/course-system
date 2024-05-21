from django.db.models.signals import post_save
from django.dispatch import receiver

from checkpoints.models import Summary


@receiver(post_save, sender=Summary)
def set_grade(sender, instance, created, **kwargs):
    if not created:
        instance.grade = instance.calculate_grade()
        instance.save()
