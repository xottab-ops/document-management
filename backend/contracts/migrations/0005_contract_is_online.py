# Generated by Django 5.0.1 on 2024-06-18 06:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("contracts", "0004_address_contract_address"),
    ]

    operations = [
        migrations.AddField(
            model_name="contract",
            name="is_online",
            field=models.BooleanField(default=False),
        ),
    ]