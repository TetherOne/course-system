# Generated by Django 5.0.2 on 2024-03-22 15:54

import courseapp.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0004_lessonvideo_lesson_name"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="LessonVideo",
            new_name="Lesson",
        ),
        migrations.CreateModel(
            name="LessonOtherFile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "other_file",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=courseapp.models.lesson_video_directory_path,
                    ),
                ),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="other_files",
                        to="courseapp.lesson",
                    ),
                ),
            ],
        ),
    ]
