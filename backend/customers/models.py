from django.db import models

# Create your models here.


class Customer(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField(max_length=256, null=True, blank=True)
    phone_number = models.CharField(max_length=32)
    passport_number = models.CharField(max_length=64, unique=True)
    passport_issuance = models.CharField(max_length=300)
    passport_issue_date = models.DateField()
    passport_division_code = models.CharField(max_length=7)
    passport_registration = models.CharField(max_length=500)
