# Generated by Django 5.0.2 on 2024-03-21 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0002_rename_lesson_lessonvideo_module"),
    ]

    operations = [
        migrations.RenameField(
            model_name="module",
            old_name="lesson_name",
            new_name="module_name",
        ),
    ]
