from userapp.models import TeacherProfile

from django.db import models

import uuid

import re


class Enrollment(models.Model):

    student = models.ForeignKey(
        "userapp.StudentProfile",
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


class Course(models.Model):

    id = models.AutoField(primary_key=True)
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
    course_password = models.CharField(max_length=50, default="", blank=True)

    def __str__(self):
        return f"{self.course_name}"

    def save(self, *args, **kwargs):
        # функция для генерации пароля курса
        if not self.course_password:
            self.course_password = str(uuid.uuid4())[:8].replace("-", "")
        super().save(*args, **kwargs)


def lesson_video_directory_path(
    instance: "LessonVideo",
    filename: str,
) -> str:
    """
    Функция для сохранения видео курса
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.lesson_name,
    )
    return f"lessons/{instance.module.course.course_name}/{valid_filename}/{filename}"


class Lesson(models.Model):

    id = models.AutoField(primary_key=True)
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

    def __str__(self):
        return f"{self.lesson_name}"


def other_file_directory_path(
    instance: "LessonOtherFile",
    filename: str,
) -> str:
    """
    Функция для сохранения дополнительных файлов курса
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

    id = models.AutoField(primary_key=True)
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


class Module(models.Model):

    id = models.AutoField(primary_key=True)
    module_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="modules",
    )

    def __str__(self):
        return f"{self.module_name}"
