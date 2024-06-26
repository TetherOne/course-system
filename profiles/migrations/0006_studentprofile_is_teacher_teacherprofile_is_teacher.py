# Generated by Django 5.0.2 on 2024-05-11 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0005_alter_studentprofile_avatar_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentprofile",
            name="is_teacher",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="teacherprofile",
            name="is_teacher",
            field=models.BooleanField(default=True),
        ),
    ]
