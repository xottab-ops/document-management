# Generated by Django 5.0.1 on 2024-06-16 04:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("customers", "0004_alter_customer_phone_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="phone_number",
            field=models.CharField(max_length=32),
        ),
    ]
