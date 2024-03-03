from django.contrib.auth.models import User

from django.db import models


class TeacherProfile(models.Model):

    id = models.AutoField(primary_key=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
    )


class Course(models.Model):

    id = models.AutoField(primary_key=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='courses',
    )