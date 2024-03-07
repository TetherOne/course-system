# Generated by Django 5.0.2 on 2024-03-07 09:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courseapp", "0016_alter_studentprofile_avatar"),
    ]

    operations = [
        migrations.CreateModel(
            name="Test",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.TextField(max_length=255)),
                (
                    "video",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="test",
                        to="courseapp.video",
                    ),
                ),
            ],
        ),
    ]