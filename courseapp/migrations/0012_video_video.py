# Generated by Django 5.0.2 on 2024-03-06 12:59

import courseapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0011_video_description"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="video",
            field=models.FileField(
                null=True, upload_to=courseapp.models.course_video_directory_path
            ),
        ),
    ]