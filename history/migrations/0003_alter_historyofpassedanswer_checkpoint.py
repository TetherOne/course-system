# Generated by Django 5.0.2 on 2024-04-16 16:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0001_initial"),
        ("history", "0002_rename_answer_historyofpassedanswer_selected_answer"),
    ]

    operations = [
        migrations.AlterField(
            model_name="historyofpassedanswer",
            name="checkpoint",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="checkpoints.checkpoint",
            ),
        ),
    ]
