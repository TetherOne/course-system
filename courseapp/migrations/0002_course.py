# Generated by Django 5.0.2 on 2024-03-02 19:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courseapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField(blank=True, max_length=10000, null=True)),
                ('teacher_profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='courses', to='courseapp.teacherprofile')),
            ],
        ),
    ]