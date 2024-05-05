from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager


class HistoryOfPassedAnswer(models.Model):

    student = models.ForeignKey(
        "profiles.StudentProfile",
        on_delete=models.SET_NULL,
        null=True,
    )
    checkpoint = models.ForeignKey(
        "checkpoints.CheckPoint",
        on_delete=models.SET_NULL,
        null=True,
    )
    question = models.ForeignKey(
        "questions.Question",
        on_delete=models.SET_NULL,
        null=True,
    )
    selected_answer = models.ForeignKey(
        "questions.Answer",
        on_delete=models.SET_NULL,
        null=True,
    )
    attempt_number = models.IntegerField(default=1)
    is_correct = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    class Meta:
        db_table = "history_of_passed_answers"
        verbose_name = "история прохождения вопроса"
        verbose_name_plural = "история прохождения вопросов"

    if TYPE_CHECKING:
        objects: Manager

    def save(self, *args, **kwargs):
        if self.selected_answer and self.selected_answer.is_correct:
            self.is_correct = True
            self.points = self.question.max_points
        else:
            self.is_correct = False
            self.points = 0

        previous_attempts = HistoryOfPassedAnswer.objects.filter(
            student=self.student,
            checkpoint=self.checkpoint,
            question=self.question,
        ).order_by("-attempt_number")
        if previous_attempts.exists():
            self.attempt_number = previous_attempts.first().attempt_number + 1
        else:
            self.attempt_number = 1

        super().save(*args, **kwargs)
