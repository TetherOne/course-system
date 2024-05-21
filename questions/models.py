from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager
from django.utils.translation import gettext_lazy as _

from checkpoints.models import CheckPoint
from questions.utils import answer_file_directory_path, question_file_directory_path


class Question(models.Model):

    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.CASCADE,
        related_name="questions",
        verbose_name=_("контрольная точка"),
    )
    question_text = models.CharField(_("текст вопроса"), max_length=255)
    max_points = models.IntegerField(_("максимальный балл"))

    class Meta:
        db_table = "questions"
        verbose_name = _("вопрос")
        verbose_name_plural = _("вопросы")

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.question_text}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.checkpoint.update_total()


class Answer(models.Model):

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
        verbose_name=_("вопрос"),
    )
    answer_text = models.CharField(
        _("текст ответа"),
        null=True,
        max_length=1000,
        blank=True,
    )
    is_correct = models.BooleanField(_("верно ли"), default=False)

    class Meta:
        db_table = "answers"
        verbose_name = _("ответ")
        verbose_name_plural = _("ответы")

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.answer_text}"


class AnswerFile(models.Model):

    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name="answer_files",
        verbose_name=_("ответ"),
    )
    answer_file = models.FileField(
        _("файл с ответом"),
        null=True,
        upload_to=answer_file_directory_path,
        blank=True,
    )

    class Meta:
        db_table = "answer_files"
        verbose_name = _("файл ответа")
        verbose_name_plural = _("файлы ответов")


class QuestionFile(models.Model):

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="question_images",
        verbose_name=_("вопрос"),
    )
    question_file = models.FileField(
        _("файл с вопросом"),
        null=True,
        upload_to=question_file_directory_path,
        blank=True,
    )

    class Meta:
        db_table = "question_files"
        verbose_name = _("файл вопроса")
        verbose_name_plural = _("файлы вопросов")
