# Generated by Django 5.0.6 on 2024-05-23 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("checkpoints", "0009_checkpoint_total"),
    ]

    operations = [
        migrations.AlterField(
            model_name="checkpoint",
            name="total",
            field=models.IntegerField(blank=True, null=True, verbose_name="всего"),
        ),
    ]
