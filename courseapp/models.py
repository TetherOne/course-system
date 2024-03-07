from django.contrib.auth.models import User

from django.db import models


class TeacherProfile(models.Model):

    id = models.AutoField(primary_key=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to='teacher-avatars/', blank=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
    )

    def __str__(self):
        return f'{self.surname}, {self.faculty}'

    def get_first_name(self):
        return self.user.first_name


class StudentProfile(models.Model):

    id = models.AutoField(primary_key=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    group = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to='student-avatars/', blank=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
    )

    def __str__(self):
        return self.user.first_name


class Course(models.Model):

    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='courses',
    )

    def __str__(self):
        return f'{self.course_name}'


def course_video_directory_path(instance: 'Video', filename: str) -> str:
    return f'videos/{instance.course.course_name}/{filename}'


class Video(models.Model):

    id = models.AutoField(primary_key=True)
    lesson_name = models.CharField(max_length=100, blank=True, null=True)
    video = models.FileField(null=True, upload_to=course_video_directory_path)
    description = models.TextField(max_length=10000, blank=True, null=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='videos',
    )