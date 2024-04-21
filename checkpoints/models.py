from django.db.models.signals import post_delete
from django.dispatch import receiver

from checkpoints.tasks import calculate_percentage_and_status

from profiles.models import StudentProfile

from .tasks import set_summary_grade

from courses.models import Module

from django.db.models import Sum

from django.db import models


class CheckPoint(models.Model):

    checkpoint_number = models.IntegerField()
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="checkpoint",
    )
    title = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     for module in self.module.course.modules.all():
    #         for summary in Summary.objects.filter(
    #             course=module.course,
    #         ):
    #             summary.save()


class PassedCheckPoint(models.Model):

    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.SET_NULL,
        related_name="passed_checkpoints",
        null=True,
    )
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.SET_NULL,
        related_name="passed_checkpoints",
        null=True,
    )
    points = models.IntegerField()
    percent = models.FloatField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    grade = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        summary = Summary.objects.filter(
            student=self.student,
            course=self.checkpoint.module.course,
        ).first()
        if not summary:
            summary = Summary.objects.create(
                student=self.student,
                course=self.checkpoint.module.course,
            )
        summary.save()


class Summary(models.Model):

    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.SET_NULL,
        related_name="summaries",
        null=True,
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        related_name="summaries",
        null=True,
    )
    current_points = models.IntegerField(default=0, editable=False)
    total = models.IntegerField(default=0)
    grade = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)