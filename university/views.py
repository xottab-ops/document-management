from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import ReadOnlyModelViewSet

from university.models import Student
from university.serializers import StudentSerializer


# Create your views here.


class StudentView(
    ReadOnlyModelViewSet,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
