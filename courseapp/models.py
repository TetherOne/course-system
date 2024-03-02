from django.contrib.auth.models import User

from django.db import models


class TeacherProfile(models.Model):

    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)