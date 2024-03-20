import re

from userapp.models import StudentProfile

from courseapp.models import Lesson

from django.db import models


class CheckPoint(models.Model):

    id = models.AutoField(primary_key=True)
    checkpoint_number = models.IntegerField()
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="checkpoint",
    )
    title = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"


def question_file_directory_path(instance: "Question", filename: str) -> str:

    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.question_text,
    )

    return f"questions/{instance.checkpoint.title}/{valid_filename}/{filename}"


class Question(models.Model):

    id = models.AutoField(primary_key=True)
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    question_file = models.FileField(
        null=True,
        upload_to=question_file_directory_path,
        blank=True,
    )
    question_text = models.CharField(max_length=255)
    max_points = models.IntegerField()

    def __str__(self):
        return f"{self.question_text}"


def answer_file_directory_path(instance: "Answer", filename: str) -> str:

    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.answer_text,
    )

    return f"answers/{instance.question.checkpoint.title}/{valid_filename}/{filename}"


class Answer(models.Model):

    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    answer_file = models.FileField(
        null=True,
        upload_to=answer_file_directory_path,
        blank=True,
    )
    answer_text = models.CharField(null=True, max_length=255, blank=True)
    is_correct = models.BooleanField(default=False)


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
    percent = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
