# Generated by Django 5.0.1 on 2024-06-15 19:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("university", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="discipline",
            name="discipline_price",
            field=models.IntegerField(default=2500),
            preserve_default=False,
        ),
    ]