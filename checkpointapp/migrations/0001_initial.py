# Generated by Django 5.0.2 on 2024-03-21 12:08

import checkpointapp.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("courseapp", "0001_initial"),
        ("userapp", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Answer",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "answer_text",
                    models.CharField(blank=True, max_length=255, null=True),
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
                        upload_to=checkpointapp.models.answer_file_directory_path,
                    ),
                ),
                (
                    "answer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="answer_files",
                        to="checkpointapp.answer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CheckPoint",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("checkpoint_number", models.IntegerField()),
                ("title", models.TextField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="checkpoint",
                        to="courseapp.module",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PassedCheckPoint",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("points", models.IntegerField()),
                ("percent", models.FloatField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "checkpoint",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="passed_checkpoints",
                        to="checkpointapp.checkpoint",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="passed_checkpoints",
                        to="userapp.studentprofile",
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
                to="checkpointapp.question",
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
