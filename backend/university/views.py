from django.shortcuts import render
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet

from document_management_backend.authorization import KeycloakAuthenticationBackend
from university.models import Student
from university.serializers import StudentSerializer

from university.models import Discipline, StudyGroup
from university.serializers import DisciplineSerializer, StudyGroupSerializer


# Create your views here.


class StudentView(
    ReadOnlyModelViewSet,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class DisciplineView(
    ReadOnlyModelViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin
):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer


class StudyGroupView(
    ReadOnlyModelViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin
):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer