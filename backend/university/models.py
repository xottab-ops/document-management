from django.db import models

# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=32)


class Discipline(models.Model):
    name = models.CharField(max_length=64)
    discipline_price = models.IntegerField()
    lessons_per_week = models.IntegerField()
    lesson_time = models.IntegerField()


class StudyGroup(models.Model):
    name = models.CharField(max_length=64)
    education_date_start = models.DateField()
    education_date_end = models.DateField()
    discipline = models.ForeignKey(Discipline, on_delete=models.PROTECT)
