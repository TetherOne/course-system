# Generated by Django 5.0.2 on 2024-03-20 16:27

import checkpointapp.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpointapp", "0007_checkpoint_checkpoint_number"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="answer",
            name="answer_file",
        ),
        migrations.RemoveField(
            model_name="question",
            name="question_file",
        ),
        migrations.CreateModel(
            name="AnswerImages",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=checkpointapp.models.answer_file_directory_path,
                    ),
                ),
                (
                    "answer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="answer_images",
                        to="checkpointapp.answer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="QuestionImages",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=checkpointapp.models.question_file_directory_path,
                    ),
                ),
                (
                    "question",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="question_images",
                        to="checkpointapp.question",
                    ),
                ),
            ],
        ),
    ]
