# Generated by Django 5.0.2 on 2024-03-21 12:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="StudentProfile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(blank=True, max_length=100, null=True)),
                ("surname", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "father_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("faculty", models.CharField(blank=True, max_length=100, null=True)),
                ("group", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "avatar",
                    models.ImageField(
                        blank=True, null=True, upload_to="student-avatars/"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="student_profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="TeacherProfile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(blank=True, max_length=100, null=True)),
                ("surname", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "father_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("faculty", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "avatar",
                    models.ImageField(
                        blank=True, null=True, upload_to="teacher-avatars/"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teacher_profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
