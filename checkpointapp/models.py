from userapp.models import StudentProfile

from courseapp.models import Lesson

from django.db import models


class CheckPoint(models.Model):

    id = models.AutoField(primary_key=True)
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.SET_NULL,
        null=True,
        related_name="checkpoint",
    )
    title = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):

    id = models.AutoField(primary_key=True)
    checkpoint = models.ForeignKey(
        CheckPoint,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    question_text = models.CharField(max_length=255)
    max_points = models.IntegerField()


class Answer(models.Model):

    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    answer_text = models.CharField(max_length=255)
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
