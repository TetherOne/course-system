from django.db.models.signals import post_save

from django.dispatch import receiver

from checkpoints.models import Summary
from questions.models import Question


@receiver(
    post_save,
    sender=Question,
)
def update_summary_total(
        sender,
        instance,
        **kwargs,
):
    summaries = Summary.objects.filter(
        course=instance.checkpoint.module.course,
    )
    for summary in summaries:
        summary.calculate_total_points()
        summary.save()
