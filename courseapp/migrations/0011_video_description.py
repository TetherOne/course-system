# Generated by Django 5.0.2 on 2024-03-06 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0010_course_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="description",
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
    ]