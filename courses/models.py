from profiles.models import TeacherProfile

from django.db import models

import uuid

import re


class Enrollment(models.Model):

    student = models.ForeignKey(
        "profiles.StudentProfile",
        on_delete=models.CASCADE,
        related_name="enrollments",
    )
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="enrollments",
    )
    enrollment_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "student",
            "course",
        )
        verbose_name = "связь студента и курса"
        verbose_name_plural = "связь студентов и курсов"


class Course(models.Model):

    course_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name="courses",
    )
    image = models.ImageField(
        null=True,
        upload_to="courses/",
        blank=True,
    )
    course_password = models.CharField(max_length=50, default="", blank=True)

    class Meta:
        verbose_name = "курс"
        verbose_name_plural = "курсы"

    def __str__(self):
        return f"{self.course_name}"

    def save(self, *args, **kwargs):
        """
        To generate course password
        """
        if not self.course_password:
            self.course_password = str(uuid.uuid4())[:8].replace("-", "")
        super().save(*args, **kwargs)


def lesson_video_directory_path(
    instance: "LessonVideo",
    filename: str,
) -> str:
    """
    For saving course videos
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.lesson_name,
    )
    return f"lessons/{instance.module.course.course_name}/{valid_filename}/{filename}"


class Lesson(models.Model):

    lesson_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    module = models.ForeignKey(
        "Module",
        on_delete=models.CASCADE,
        related_name="videos",
    )
    video = models.FileField(
        null=True,
        upload_to=lesson_video_directory_path,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

    class Meta:
        verbose_name = "урок"
        verbose_name_plural = "уроки"

    def __str__(self):
        return f"{self.lesson_name}"


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
    )
    other_file = models.FileField(
        null=True,
        upload_to=other_file_directory_path,
        blank=True,
    )

    class Meta:
        verbose_name = "дополнительный файл"
        verbose_name_plural = "дополнительные файлы"


class Module(models.Model):

    module_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="modules",
    )
    status = models.BooleanField(default=True)

    class Meta:
        verbose_name = "модуль"
        verbose_name_plural = "модули"

    def __str__(self):
        return f"{self.module_name}"
