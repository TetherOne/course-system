# Generated by Django 5.0.2 on 2024-03-16 18:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpointapp", "0001_initial"),
        ("userapp", "0002_alter_studentprofile_user_alter_teacherprofile_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="checkpoint",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="passed_checkpoints",
                to="checkpointapp.checkpoint",
            ),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="passed_checkpoints",
                to="userapp.studentprofile",
            ),
        ),
    ]
