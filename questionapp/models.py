from checkpointapp.models import CheckPoint
from checkpointapp.models import Summary

from django.db import models

import re


class Question(models.Model):

    id = models.AutoField(primary_key=True)
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    question_text = models.CharField(max_length=255)
    max_points = models.IntegerField()

    def __str__(self):
        return f"{self.question_text}"

    def save(self, *args, **kwargs):
        # функция для пересчета баллов за КТ в моделях Summary и PassedCheckPoint,
        # при добавлении нового вопроса или изменении его баллов
        super().save(*args, **kwargs)
        passed_checkpoints = self.checkpoint.passed_checkpoints.all()

        for passed_checkpoint in passed_checkpoints:

            passed_checkpoint.save()
            summary = Summary.objects.filter(
                student=passed_checkpoint.student,
                course=passed_checkpoint.checkpoint.module.course,
            ).first()

            if summary:
                summary.calculate_summary_points()
                summary.save()


class Answer(models.Model):

    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    answer_text = models.CharField(null=True, max_length=1000, blank=True)
    is_correct = models.BooleanField(default=False)


def answer_file_directory_path(instance: "AnswerFile", filename: str) -> str:
    # функция для сохранения файлов, которые студент прикрепил к ответу на вопрос
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.answer.question.checkpoint.title,  # используем информацию из связанного вопроса
    )
    return f"answers/{valid_filename}/{filename}"


class AnswerFile(models.Model):

    id = models.AutoField(primary_key=True)
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


def question_file_directory_path(instance: "QuestionFile", filename: str) -> str:
    # функция для сохранения файлов, которые преподаватель прикрепил к вопросу
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.question.question_text,
    )
    return f"questions/{instance.question.checkpoint.title}/{valid_filename}/{filename}"


class QuestionFile(models.Model):

    id = models.AutoField(primary_key=True)
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
