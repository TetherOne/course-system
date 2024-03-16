from userapp.models import TeacherProfile

from django.db import models

import uuid


class Enrollment(models.Model):
    student = models.ForeignKey(
        "userapp.StudentProfile", on_delete=models.CASCADE, related_name="enrollments"
    )
    course = models.ForeignKey(
        "Course", on_delete=models.CASCADE, related_name="enrollments"
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


def course_video_directory_path(instance: "Video", filename: str) -> str:
    return f"videos/{instance.course.course_name}/{filename}"


class Lesson(models.Model):
    id = models.AutoField(primary_key=True)
    lesson_name = models.CharField(max_length=100, blank=True, null=True)
    video = models.FileField(
        null=True,
        upload_to=course_video_directory_path,
        blank=True,
    )
    description = models.TextField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="lessons",
    )
