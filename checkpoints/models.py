from django.utils.translation import gettext_lazy as _

from typing import TYPE_CHECKING

from profiles.models import StudentProfile

from courses.models import Module

from django.db.models import Sum, Max, Manager

from django.db import models


class CheckPoint(models.Model):

    checkpoint_number = models.IntegerField(_("номер контрольной точки"))
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="checkpoint",
        verbose_name=_("модуль"),
    )
    name = models.TextField(_("название"), max_length=255)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)

    class Meta:
        db_table = "checkpoints"
        verbose_name = "контрольный точка"
        verbose_name_plural = "контрольные точки"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.name}"


class PassedCheckPoint(models.Model):

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.SET_NULL,
        related_name="passed_checkpoints",
        null=True,
        verbose_name=_("студент"),
    )
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.SET_NULL,
        related_name="passed_checkpoints",
        null=True,
        verbose_name=_("контрольная точка"),
    )
    points = models.IntegerField(_("баллы"))
    percent = models.FloatField(_("процент"), blank=True, null=True)
    status = models.CharField(_("статус"), max_length=255, blank=True, null=True)
    grade = models.CharField(_("оценка"), max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)

    class Meta:
        db_table = "passed_checkpoints"
        verbose_name = "пройденная контрольная точка"
        verbose_name_plural = "пройденные контрольные точки"

    if TYPE_CHECKING:
        objects: Manager

    def calculate_points(self):
        """
        Calculate points for the passed checkpoint based on the last attempt for each question.
        """
        from history.models import HistoryOfSelectedAnswer

        total_points = 0
        history_records = (
            HistoryOfSelectedAnswer.objects.filter(
                student=self.student,
                checkpoint=self.checkpoint,
            )
            .order_by("question", "-attempt_number")
            .distinct("question")
        )
        for passed_question in history_records:
            total_points += passed_question.points
        self.points = total_points

    def save(self, *args, **kwargs):
        """
        Create Summary for student.
        """
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

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.SET_NULL,
        related_name="summaries",
        null=True,
        verbose_name=_("студент"),
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        related_name="summaries",
        null=True,
        verbose_name=_("курс"),
    )
    current_points = models.IntegerField(_("текущие баллы"), default=0, editable=False)
    total = models.IntegerField(_("итог"), default=0)
    grade = models.CharField(_("оценка"), max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)

    class Meta:
        db_table = "summaries"
        verbose_name = "зачетная таблица"
        verbose_name_plural = "зачетные таблицы"

    if TYPE_CHECKING:
        objects: Manager

    def calculate_total_points(self):
        from questions.models import Question

        total_points = 0
        checkpoints = CheckPoint.objects.filter(
            module__course=self.course,
        )
        for checkpoint in checkpoints:
            total_points += (
                Question.objects.filter(
                    checkpoint=checkpoint,
                ).aggregate(
                    total_points=Sum("max_points"),
                )["total_points"]
                or 0
            )
        self.total = total_points

    def calculate_current_points(self):
        """
        Calculate current points for the student in the course.
        """
        current_points = 0
        latest_passed_checkpoints = (
            PassedCheckPoint.objects.filter(
                student=self.student,
                checkpoint__module__course=self.course,
            )
            .values(
                "checkpoint__module",
            )
            .annotate(
                max_created_at=Max("created_at"),
            )
        )

        for module_checkpoint in latest_passed_checkpoints:
            latest_checkpoint = PassedCheckPoint.objects.filter(
                student=self.student,
                checkpoint__module=module_checkpoint["checkpoint__module"],
                created_at=module_checkpoint["max_created_at"],
            ).first()

            current_points += latest_checkpoint.points if latest_checkpoint else 0

        self.current_points = current_points

    def save(self, *args, **kwargs):
        """
        Calculate total points and current points for Summary.
        """
        self.calculate_total_points()
        self.calculate_current_points()
        super().save(*args, **kwargs)
