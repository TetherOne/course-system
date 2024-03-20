# Generated by Django 5.0.2 on 2024-03-20 16:41

import checkpointapp.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpointapp", "0009_alter_answerimages_image_alter_questionimages_image"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="AnswerImages",
            new_name="AnswerImage",
        ),
        migrations.CreateModel(
            name="QuestionImage",
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
        migrations.DeleteModel(
            name="QuestionImages",
        ),
    ]
