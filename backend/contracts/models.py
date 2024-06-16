from django.db import models

# Create your models here.


class Contract(models.Model):
    student = models.ForeignKey("university.Student", on_delete=models.PROTECT)
    customer = models.ForeignKey("customers.Customer", on_delete=models.PROTECT)
    study_group = models.ForeignKey("university.StudyGroup", on_delete=models.PROTECT)
    creator = models.ForeignKey("users.User", on_delete=models.PROTECT)
    contract_creation_date = models.DateField()
    contract_expiration_date = models.DateField()
    contract_price = models.IntegerField()
