from checkpoints.models import CheckPoint
from profiles.models import StudentProfile

from questions.models import Question
from questions.models import Answer

from django.db import models


class HistoryOfPassedAnswer(models.Model):

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.SET_NULL,
        null=True,
    )
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.SET_NULL,
        null=True,
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.SET_NULL,
        null=True,
    )
    selected_answer = models.ForeignKey(
        Answer,
        on_delete=models.SET_NULL,
        null=True,
    )
