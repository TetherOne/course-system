from django.db.models import Sum

from profiles.models import StudentProfile

from courses.models import Module

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

    def calculate_points(self):
        from history.models import HistoryOfPassedAnswer
        total_points = 0
        history_records = HistoryOfPassedAnswer.objects.filter(
            student=self.student,
            checkpoint=self.checkpoint,
        )
        if history_records.exists():  # Проверяем наличие записей в HistoryOfPassedAnswer
            for passed_question in history_records:
                total_points += passed_question.points
        self.points = total_points

    def save(self, *args, **kwargs):
        self.calculate_points()
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

    def calculate_total_points(self):
        from questions.models import Question
        total_points = 0
        checkpoints = CheckPoint.objects.filter(
            module__course=self.course,
        )
        for checkpoint in checkpoints:
            total_points += Question.objects.filter(
                checkpoint=checkpoint,
            ).aggregate(
                total_points=Sum('max_points'),
            )['total_points'] or 0
        self.total = total_points

    def save(self, *args, **kwargs):
        self.calculate_total_points()
        super().save(*args, **kwargs)
