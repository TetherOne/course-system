from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager

from authentication.models import CustomUser


class TeacherProfile(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.ImageField(
        null=True,
        upload_to="teacher-avatars/",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
    )

    class Meta:
        verbose_name = "профиль преподавателя"
        verbose_name_plural = "профили преподавателей"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.surname}, {self.faculty}"


class StudentProfile(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    group = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.ImageField(
        null=True,
        upload_to="student-avatars/",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="student_profile",
    )

    class Meta:
        verbose_name = "профиль студента"
        verbose_name_plural = "профили студентов"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.surname}, {self.faculty}, {self.group}"
