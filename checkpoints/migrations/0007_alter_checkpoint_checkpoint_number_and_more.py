# Generated by Django 5.0.2 on 2024-05-09 18:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "checkpoints",
            "0006_alter_checkpoint_table_alter_passedcheckpoint_table_and_more",
        ),
        ("courses", "0006_alter_course_course_name_and_more"),
        ("profiles", "0004_alter_studentprofile_user_alter_teacherprofile_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="checkpoint",
            name="checkpoint_number",
            field=models.IntegerField(verbose_name="номер контрольной точки"),
        ),
        migrations.AlterField(
            model_name="checkpoint",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="дата создания"),
        ),
        migrations.AlterField(
            model_name="checkpoint",
            name="module",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="checkpoint",
                to="courses.module",
                verbose_name="модуль",
            ),
        ),
        migrations.AlterField(
            model_name="checkpoint",
            name="title",
            field=models.TextField(max_length=255, verbose_name="название"),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="checkpoint",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="passed_checkpoints",
                to="checkpoints.checkpoint",
                verbose_name="контрольная точка",
            ),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="дата создания"),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="grade",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="оценка"
            ),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="percent",
            field=models.FloatField(blank=True, null=True, verbose_name="процент"),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="points",
            field=models.IntegerField(verbose_name="баллы"),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="status",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="статус"
            ),
        ),
        migrations.AlterField(
            model_name="passedcheckpoint",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="passed_checkpoints",
                to="profiles.studentprofile",
                verbose_name="студент",
            ),
        ),
        migrations.AlterField(
            model_name="summary",
            name="course",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="summaries",
                to="courses.course",
                verbose_name="курс",
            ),
        ),
        migrations.AlterField(
            model_name="summary",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="дата создания"),
        ),
        migrations.AlterField(
            model_name="summary",
            name="current_points",
            field=models.IntegerField(
                default=0, editable=False, verbose_name="текущие баллы"
            ),
        ),
        migrations.AlterField(
            model_name="summary",
            name="grade",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="оценка"
            ),
        ),
        migrations.AlterField(
            model_name="summary",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="summaries",
                to="profiles.studentprofile",
                verbose_name="студент",
            ),
        ),
        migrations.AlterField(
            model_name="summary",
            name="total",
            field=models.IntegerField(default=0, verbose_name="итог"),
        ),
    ]
