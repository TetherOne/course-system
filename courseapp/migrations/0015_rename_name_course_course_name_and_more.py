# Generated by Django 5.0.2 on 2024-03-06 13:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0014_video_name"),
    ]

    operations = [
        migrations.RenameField(
            model_name="course",
            old_name="name",
            new_name="course_name",
        ),
        migrations.RenameField(
            model_name="video",
            old_name="name",
            new_name="lesson_name",
        ),
    ]