# Generated by Django 5.0.2 on 2024-03-16 08:21

import courseapp.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("userapp", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "course_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "description",
                    models.TextField(blank=True, max_length=10000, null=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "course_password",
                    models.CharField(blank=True, default="", max_length=50),
                ),
                (
                    "teacher_profile",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="courses",
                        to="userapp.teacherprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Lesson",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "lesson_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "video",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=courseapp.models.course_video_directory_path,
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, max_length=10000, null=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lessons",
                        to="courseapp.course",
                    ),
                ),
            ],
        ),
    ]