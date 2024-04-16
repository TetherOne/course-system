# Generated by Django 5.0.2 on 2024-04-16 08:19

import django.db.models.deletion
import questions.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('checkpoints', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_text', models.CharField(blank=True, max_length=1000, null=True)),
                ('is_correct', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='AnswerFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_file', models.FileField(blank=True, null=True, upload_to=questions.models.answer_file_directory_path)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answer_files', to='questions.answer')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=255)),
                ('max_points', models.IntegerField()),
                ('checkpoint', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='checkpoints.checkpoint')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='questions.question'),
        ),
        migrations.CreateModel(
            name='QuestionFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_file', models.FileField(blank=True, null=True, upload_to=questions.models.question_file_directory_path)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_images', to='questions.question')),
            ],
        ),
    ]