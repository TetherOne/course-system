# Generated by Django 5.0.2 on 2024-04-03 14:01

import django.db.models.deletion
import questionapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("checkpointapp", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Answer",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "answer_text",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                ("is_correct", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="AnswerFile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "answer_file",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=questionapp.models.answer_file_directory_path,
                    ),
                ),
                (
                    "answer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="answer_files",
                        to="questionapp.answer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Question",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("question_text", models.CharField(max_length=255)),
                ("max_points", models.IntegerField()),
                (
                    "checkpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="questions",
                        to="checkpointapp.checkpoint",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="answer",
            name="question",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="answers",
                to="questionapp.question",
            ),
        ),
        migrations.CreateModel(
            name="QuestionFile",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "question_file",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=questionapp.models.question_file_directory_path,
                    ),
                ),
                (
                    "question",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="question_images",
                        to="questionapp.question",
                    ),
                ),
            ],
        ),
    ]
