from cheackpoints.tasks import calculate_percentage_and_status

from profiles.models import StudentProfile

from .tasks import set_summary_grade

from courses.models import Module

from django.db.models import Sum

from django.db import models


class CheckPoint(models.Model):

    id = models.AutoField(primary_key=True)
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

    def save(self, *args, **kwargs):
        """
        After saving a new checkpoint, the points
        are recalculated in the Summary of this course
        """
        super().save(*args, **kwargs)
        for module in self.module.course.modules.all():
            for summary in Summary.objects.filter(
                course=module.course,
            ):
                summary.calculate_summary_points()
                summary.save()


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
        """
        Recalculation of points in the PassedCheckPoint table.
        Checking the presence of a summary table for a given
        student and course. If there is no entry in the
        Summary table - it will be created.
        """
        calculate_percentage_and_status(self)
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

        summary.calculate_summary_points()
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

    def calculate_summary_points(self):
        """
        To calculate the maximum score
        for all checkpoints of this course
        """
        if self.course:
            self.current_points = (
                PassedCheckPoint.objects.filter(
                    student=self.student,
                    checkpoint__module__course=self.course,
                ).aggregate(Sum("points"))["points__sum"]
                or 0
            )

            self.total = (
                CheckPoint.objects.filter(
                    module__course=self.course,
                ).aggregate(
                    Sum("questions__max_points")
                )["questions__max_points__sum"]
                or 0
            )
        set_summary_grade(self)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.calculate_summary_points()
