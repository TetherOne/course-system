from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager, Sum
from django.utils.translation import gettext_lazy as _

from checkpoints.utils import (
    calculate_current_points,
    calculate_grade,
    calculate_points,
    calculate_total_points,
)
from courses.models import Module
from profiles.models import StudentProfile


class CheckPoint(models.Model):

    checkpoint_number = models.IntegerField(
        _("номер контрольной точки"),
    )
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="checkpoint",
        verbose_name=_("модуль"),
    )
    name = models.TextField(_("название"), max_length=255)
    total = models.IntegerField(_("всего"), null=True, blank=True)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)

    def update_total(self):
        self.total = (
            self.questions.aggregate(
                Sum("max_points"),
            )["max_points__sum"]
            or 0
        )
        self.save()

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

    def save(self, *args, **kwargs):
        """
        Create Summary for student.
        """
        self.points = calculate_points(self.student, self.checkpoint)
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

    def save(self, *args, **kwargs):
        """
        Calculate total points and current points for Summary.
        """
        self.total = calculate_total_points(self.course)
        self.current_points = calculate_current_points(self.student, self.course)
        self.grade = calculate_grade(self.current_points, self.total)
        super().save(*args, **kwargs)
