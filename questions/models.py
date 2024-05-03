from django.utils.translation import gettext_lazy as _

from checkpoints.models import CheckPoint

from django.db import models

import re


class Question(models.Model):

    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    question_text = models.CharField(max_length=255)
    max_points = models.IntegerField()

    class Meta:
        verbose_name = _("вопрос")
        verbose_name_plural = _("вопросы")

    def __str__(self):
        return f"{self.question_text}"


class Answer(models.Model):

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    answer_text = models.CharField(
        null=True,
        max_length=1000,
        blank=True,
    )
    is_correct = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("ответ")
        verbose_name_plural = _("ответы")

    def __str__(self):
        return f"{self.answer_text}"


def answer_file_directory_path(
    instance: "AnswerFile",
    filename: str,
) -> str:
    """
    For saving files that the student
    attached to the answer to the question
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.answer.question.checkpoint.title,
    )
    return f"answers/{valid_filename}/{filename}"


class AnswerFile(models.Model):

    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name="answer_files",
    )
    answer_file = models.FileField(
        null=True,
        upload_to=answer_file_directory_path,
        blank=True,
    )

    class Meta:
        verbose_name = _("файл ответа")
        verbose_name_plural = _("файлы ответов")


def question_file_directory_path(
    instance: "QuestionFile",
    filename: str,
) -> str:
    """
    For saving files that the teacher
    attached to the question
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.question.question_text,
    )
    return (
        f"questions/{instance.question.checkpoint.title}/"
        f"{valid_filename}/{filename}"
    )


class QuestionFile(models.Model):

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="question_images",
    )
    question_file = models.FileField(
        null=True,
        upload_to=question_file_directory_path,
        blank=True,
    )

    class Meta:
        verbose_name = _("файл вопроса")
        verbose_name_plural = _("файлы вопросов")
