# Generated by Django 5.0.2 on 2024-04-21 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("history", "0003_alter_historyofpassedanswer_checkpoint"),
    ]

    operations = [
        migrations.AddField(
            model_name="historyofpassedanswer",
            name="is_correct",
            field=models.BooleanField(default=False),
        ),
    ]