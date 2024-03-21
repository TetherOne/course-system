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
        unique_together = ("student", "course")


class Course(models.Model):

    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
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
        if not self.course_password:
            self.course_password = str(uuid.uuid4())[:8].replace("-", "")
        super().save(*args, **kwargs)


def lesson_video_directory_path(instance: "LessonVideo", filename: str) -> str:
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.description,
    )
    return f"lessons/{instance.lesson.course.course_name}/{valid_filename}/{filename}"


class LessonVideo(models.Model):

    id = models.AutoField(primary_key=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    lesson = models.ForeignKey(
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


class Module(models.Model):

    id = models.AutoField(primary_key=True)
    lesson_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="modules",
    )

    def __str__(self):
        return f"{self.lesson_name}"
