from django.contrib.auth.models import User

from django.db import models


class TeacherProfile(models.Model):

    id = models.AutoField(primary_key=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to='teacher-avatars/')
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
    )

    def __str__(self):
        return f'Преподаватель: {self.surname}, факультет {self.faculty}'


class StudentProfile(models.Model):

    id = models.AutoField(primary_key=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    group = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to='student-avatars/')
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
    )


class Course(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='courses',
    )

    def __str__(self):
        return f'Курс: {self.name}'


class Video(models.Model):

    id = models.AutoField(primary_key=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    # upload = models.FileField(upload_to="uploads/")  у каждого курса должна быть отдельная папка и т.д
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='videos',
    )