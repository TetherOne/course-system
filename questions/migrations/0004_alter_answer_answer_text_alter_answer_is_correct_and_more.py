# Generated by Django 5.0.2 on 2024-05-09 18:12

import django.db.models.deletion
from django.db import migrations, models

import questions.models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0007_alter_checkpoint_checkpoint_number_and_more"),
        ("questions", "0003_alter_answer_table_alter_answerfile_table_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="answer",
            name="answer_text",
            field=models.CharField(
                blank=True, max_length=1000, null=True, verbose_name="текст ответа"
            ),
        ),
        migrations.AlterField(
            model_name="answer",
            name="is_correct",
            field=models.BooleanField(default=False, verbose_name="верно ли"),
        ),
        migrations.AlterField(
            model_name="answer",
            name="question",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="answers",
                to="questions.question",
                verbose_name="вопрос",
            ),
        ),
        migrations.AlterField(
            model_name="answerfile",
            name="answer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="answer_files",
                to="questions.answer",
                verbose_name="ответ",
            ),
        ),
        migrations.AlterField(
            model_name="answerfile",
            name="answer_file",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=questions.models.answer_file_directory_path,
                verbose_name="файл с ответом",
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="checkpoint",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="questions",
                to="checkpoints.checkpoint",
                verbose_name="контрольная точка",
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="max_points",
            field=models.IntegerField(verbose_name="максимальный балл"),
        ),
        migrations.AlterField(
            model_name="question",
            name="question_text",
            field=models.CharField(max_length=255, verbose_name="текст вопроса"),
        ),
        migrations.AlterField(
            model_name="questionfile",
            name="question",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="question_images",
                to="questions.question",
                verbose_name="вопрос",
            ),
        ),
        migrations.AlterField(
            model_name="questionfile",
            name="question_file",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=questions.models.question_file_directory_path,
                verbose_name="файл с вопросом",
            ),
        ),
    ]
