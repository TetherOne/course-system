# Generated by Django 5.0.2 on 2024-04-19 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courses", "0002_lesson_status_module_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="courses/"),
        ),
    ]
