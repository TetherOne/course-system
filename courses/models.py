from django.utils.translation import gettext_lazy as _

from courses.utils import lesson_video_directory_path
from profiles.models import TeacherProfile

from django.db.models import Manager
from django.db import models

from typing import TYPE_CHECKING

import uuid

import re


class Enrollment(models.Model):

    student = models.ForeignKey(
        "profiles.StudentProfile",
        on_delete=models.CASCADE,
        related_name="enrollments",
        verbose_name=_("студент"),
    )
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="enrollments",
        verbose_name=_("курс"),
    )
    enrollment_date = models.DateTimeField(_("дата зачисления"), auto_now_add=True)

    class Meta:
        db_table = "enrollments"
        unique_together = (
            "student",
            "course",
        )
        verbose_name = "связь студента и курса"
        verbose_name_plural = "связь студентов и курсов"

    if TYPE_CHECKING:
        objects: Manager


class Course(models.Model):

    course_name = models.CharField(
        _("название курса"),
        max_length=100,
        blank=True,
        null=True,
    )
    description = models.TextField(
        _("описание"),
        max_length=10000,
        blank=True,
        null=True,
    )
    status = models.BooleanField(_("статус"), default=True)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name="courses",
        verbose_name=_("профиль преподавателя"),
    )
    image = models.ImageField(
        _("изображение"),
        null=True,
        upload_to="courses/",
        blank=True,
    )
    course_password = models.CharField(
        _("пароль курса"),
        max_length=50,
        default="",
        blank=True,
    )

    class Meta:
        db_table = "courses"
        verbose_name = "курс"
        verbose_name_plural = "курсы"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.course_name}"

    def save(self, *args, **kwargs):
        """
        To generate course password
        """
        if not self.course_password:
            self.course_password = str(uuid.uuid4())[:8].replace("-", "")
        super().save(*args, **kwargs)


class Lesson(models.Model):

    name = models.CharField(
        _("название"),
        max_length=100,
        blank=True,
        null=True,
    )
    description = models.TextField(
        _("описание"),
        max_length=10000,
        blank=True,
        null=True,
    )
    module = models.ForeignKey(
        "Module",
        on_delete=models.CASCADE,
        related_name="videos",
        verbose_name=_("модуль"),
    )
    video = models.FileField(
        _("видео"),
        null=True,
        upload_to=lesson_video_directory_path,
        blank=True,
    )
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)
    status = models.BooleanField(_("статус"), default=True)

    class Meta:
        db_table = "lessons"
        verbose_name = "урок"
        verbose_name_plural = "уроки"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.name}"


def other_file_directory_path(
    instance: "LessonOtherFile",
    filename: str,
) -> str:
    """
    For saving additional course files
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.lesson.lesson_name,
    )
    return (
        f"lessons/{instance.lesson.module.course.course_name}/"
        f"{valid_filename}/{filename}"
    )


class LessonOtherFile(models.Model):

    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="other_files",
        verbose_name=_("урок"),
    )
    other_file = models.FileField(
        _("дополнительный файл"),
        null=True,
        upload_to=other_file_directory_path,
        blank=True,
    )

    if TYPE_CHECKING:
        objects: Manager

    class Meta:
        db_table = "lesson_other_files"
        verbose_name = "дополнительный файл"
        verbose_name_plural = "дополнительные файлы"


class Module(models.Model):

    name = models.CharField(_("название"), max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(_("дата создания"), auto_now_add=True)
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="modules",
        verbose_name=_("курс"),
    )
    status = models.BooleanField(_("статус"), default=True)

    class Meta:
        db_table = "modules"
        verbose_name = "модуль"
        verbose_name_plural = "модули"

    if TYPE_CHECKING:
        objects: Manager

    def __str__(self):
        return f"{self.name}"
