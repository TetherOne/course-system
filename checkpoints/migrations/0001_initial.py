# Generated by Django 5.0.2 on 2024-04-16 08:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("courses", "0001_initial"),
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="CheckPoint",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("checkpoint_number", models.IntegerField()),
                ("title", models.TextField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "module",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="checkpoint",
                        to="courses.module",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PassedCheckPoint",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("points", models.IntegerField()),
                ("percent", models.FloatField(blank=True, null=True)),
                ("status", models.CharField(blank=True, max_length=255, null=True)),
                ("grade", models.CharField(blank=True, max_length=255, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "checkpoint",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="passed_checkpoints",
                        to="checkpoints.checkpoint",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="passed_checkpoints",
                        to="profiles.studentprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Summary",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("current_points", models.IntegerField(default=0, editable=False)),
                ("total", models.IntegerField(default=0)),
                ("grade", models.CharField(blank=True, max_length=255, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "course",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="summaries",
                        to="courses.course",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="summaries",
                        to="profiles.studentprofile",
                    ),
                ),
            ],
        ),
    ]
