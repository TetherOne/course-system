# Generated by Django 5.0.2 on 2024-03-13 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0023_rename_video_lesson"),
    ]

    operations = [
        migrations.RenameField(
            model_name="test",
            old_name="video",
            new_name="lesson",
        ),
    ]