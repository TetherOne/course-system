# Generated by Django 5.0.2 on 2024-05-05 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("questions", "0002_alter_answer_options_alter_answerfile_options_and_more"),
    ]

    operations = [
        migrations.AlterModelTable(
            name="answer",
            table="answers",
        ),
        migrations.AlterModelTable(
            name="answerfile",
            table="answer_files",
        ),
        migrations.AlterModelTable(
            name="question",
            table="questions",
        ),
        migrations.AlterModelTable(
            name="questionfile",
            table="question_files",
        ),
    ]