# Generated by Django 5.0.2 on 2024-04-17 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="checkpoint",
            name="status",
            field=models.BooleanField(default=True),
        ),
    ]
