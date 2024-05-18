from typing import TYPE_CHECKING

from django.db import models
from django.db.models import Manager
from django.utils.translation import gettext_lazy as _

from authentication.models import CustomUser


class TeacherProfile(models.Model):

    name = models.CharField(_("имя"), max_length=100, blank=True, null=True)
    surname = models.CharField(_("фамилия"), max_length=100, blank=True, null=True)
    father_name = models.CharField(_("отчество"), max_length=100, blank=True, null=True)
    faculty = models.CharField(_("факультет"), max_length=100, blank=True, null=True)
    avatar = models.ImageField(
        _("фото профиля"),
        null=True,
        upload_to="teacher-avatars/",
        blank=True,
    )
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
        verbose_name=_("пользователь"),
    )
    is_teacher = models.BooleanField(default=True)

    class Meta:
        db_table = "teacher_profiles"
        verbose_name = "профиль преподавателя"
        verbose_name_plural = "профили преподавателей"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.surname}, {self.faculty}"


class StudentProfile(models.Model):

    name = models.CharField(_("имя"), max_length=100, blank=True, null=True)
    surname = models.CharField(_("фамилия"), max_length=100, blank=True, null=True)
    father_name = models.CharField(_("отчество"), max_length=100, blank=True, null=True)
    faculty = models.CharField(_("факультет"), max_length=100, blank=True, null=True)
    group = models.CharField(_("группа"), max_length=100, blank=True, null=True)
    avatar = models.ImageField(
        _("фото профиля"),
        null=True,
        upload_to="student-avatars/",
        blank=True,
    )
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)
    is_teacher = models.BooleanField(default=False)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="student_profile",
        verbose_name=_("пользователь"),
    )

    class Meta:
        db_table = "student_profiles"
        verbose_name = "профиль студента"
        verbose_name_plural = "профили студентов"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.surname}, {self.faculty}, {self.group}"
