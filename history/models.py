from django.utils.translation import gettext_lazy as _

from django.db.models import Manager
from django.db import models

from typing import TYPE_CHECKING


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
        if self.selected_answer and self.selected_answer.is_correct:
            self.is_correct = True
            self.points = self.question.max_points
        else:
            self.is_correct = False
            self.points = 0

        previous_attempts = HistoryOfSelectedAnswer.objects.filter(
            student=self.student,
            checkpoint=self.checkpoint,
            question=self.question,
        ).order_by("-attempt_number")
        if previous_attempts.exists():
            self.attempt_number = previous_attempts.first().attempt_number + 1
        else:
            self.attempt_number = 1

        super().save(*args, **kwargs)
