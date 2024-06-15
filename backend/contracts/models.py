from django.db import models

# Create your models here.


class Status(models.Model):
    name = models.CharField(max_length=64)


class ContractStatus(models.Model):
    status = models.ForeignKey("contracts.Status", on_delete=models.CASCADE)
    contract = models.ForeignKey("contracts.Contract", on_delete=models.CASCADE)
    status_date_added = models.DateTimeField(auto_now_add=True)
    status_date_updated = models.DateTimeField(auto_now=True)


class Contract(models.Model):
    student = models.ForeignKey("university.Student", on_delete=models.PROTECT)
    customer = models.ForeignKey("customers.Customer", on_delete=models.PROTECT)
    study_group = models.ForeignKey("university.StudyGroup", on_delete=models.PROTECT)
    creator = models.ForeignKey("users.User", on_delete=models.PROTECT)
    contract_creation_date = models.DateField()
    contract_expiration_date = models.DateField()
    contract_price = models.IntegerField()
