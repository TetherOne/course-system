# Generated by Django 5.0.2 on 2024-03-15 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0030_alter_course_course_password"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="course_password",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
    ]