# Generated by Django 5.0.2 on 2024-05-09 18:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0007_alter_checkpoint_checkpoint_number_and_more"),
        ("history", "0008_alter_historyofpassedanswer_table"),
        ("profiles", "0004_alter_studentprofile_user_alter_teacherprofile_user"),
        ("questions", "0004_alter_answer_answer_text_alter_answer_is_correct_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="attempt_number",
            field=models.IntegerField(default=1, verbose_name="попытка"),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="checkpoint",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="checkpoints.checkpoint",
                verbose_name="контрольная точка",
            ),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="is_correct",
            field=models.BooleanField(default=False, verbose_name="правильно ли"),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="points",
            field=models.IntegerField(default=0, verbose_name="баллы"),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="question",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="questions.question",
                verbose_name="вопрос",
            ),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="selected_answer",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="questions.answer",
                verbose_name="выбранный ответ",
            ),
        ),
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="profiles.studentprofile",
                verbose_name="студент",
            ),
        ),
    ]
