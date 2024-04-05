from userapp.models import StudentProfile

from courseapp.models import Module

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
        # функция для подсчета процента и статуса (зачет/не зачет) за КТ
        if self.checkpoint:
            total_max_points = sum(
                question.max_points for question in self.checkpoint.questions.all()
            )
            if total_max_points > 0:
                self.percent = (self.points / total_max_points) * 100
            else:
                self.percent = 0.0

            if self.percent < 41:
                self.grade = "2"
                self.status = "Не зачет"
            elif 41 <= self.percent <= 61:
                self.grade = "3"
                self.status = "Зачет"
            elif 61 < self.percent <= 81:
                self.grade = "4"
                self.status = "Зачет"
            else:
                self.grade = "5"
                self.status = "Зачет"

        super().save(*args, **kwargs)
        summary = self.student.summaries.filter(
            course=self.checkpoint.module.course
        ).first()

        if summary:
            summary.calculate_current_points()
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
        "courseapp.Course",
        on_delete=models.SET_NULL,
        related_name="summaries",
        null=True,
    )
    current_points = models.IntegerField(default=0, editable=False)
    total = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_summary_points(self):
        # функция для подсчета максимального балла за все КТ этого курса
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

    def calculate_current_points(self):
        # функция для подсчета текущего балла у студента
        # за все КТ этого курса
        if self.course:
            self.current_points = (
                PassedCheckPoint.objects.filter(
                    student=self.student,
                    checkpoint__module__course=self.course,
                ).aggregate(Sum("points"))["points__sum"]
                or 0
            )

    def save(self, *args, **kwargs):
        self.calculate_summary_points()
        super().save(*args, **kwargs)
