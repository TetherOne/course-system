# Generated by Django 5.0.2 on 2024-05-03 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="studentprofile",
            options={
                "verbose_name": "профиль студента",
                "verbose_name_plural": "профили студентов",
            },
        ),
        migrations.AlterModelOptions(
            name="teacherprofile",
            options={
                "verbose_name": "профиль преподавателя",
                "verbose_name_plural": "профили преподавателей",
            },
        ),
    ]
