# Generated by Django 5.0.2 on 2024-04-21 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0002_checkpoint_status"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="checkpoint",
            name="status",
        ),
    ]
