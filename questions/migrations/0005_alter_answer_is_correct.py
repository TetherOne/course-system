# Generated by Django 5.0.2 on 2024-05-21 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("questions", "0004_alter_answer_answer_text_alter_answer_is_correct_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="answer",
            name="is_correct",
            field=models.BooleanField(verbose_name="верно ли"),
        ),
    ]
