from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager
from django.utils.translation import gettext_lazy as _


class HistoryOfSelectedAnswer(models.Model):
    student = models.ForeignKey(
        "profiles.StudentProfile",
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("студент"),
    )
    checkpoint = models.ForeignKey(
        "checkpoints.CheckPoint",
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("контрольная точка"),
    )
    question = models.ForeignKey(
        "questions.Question",
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("вопрос"),
    )
    selected_answer = models.ForeignKey(
        "questions.Answer",
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("выбранный ответ"),
    )
    attempt_number = models.IntegerField(_("попытка"), default=1)
    is_correct = models.BooleanField(_("правильно ли"), default=False)
    points = models.IntegerField(_("баллы"), default=0)

    class Meta:
        db_table = "history_of_selected_answers"
        verbose_name = "история выбора ответа"
        verbose_name_plural = "история выбора ответов"

    if TYPE_CHECKING:
        objects: Manager

    def save(self, *args, **kwargs):
        from history.utils import calculate_points, determine_attempt_number

        self.points = calculate_points(
            self.selected_answer,
            self.question,
        )
        self.attempt_number = determine_attempt_number(
            self.student,
            self.checkpoint,
            self.question,
        )
        super().save(*args, **kwargs)
