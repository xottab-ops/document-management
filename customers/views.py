from django.shortcuts import render
from rest_framework import mixins, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from customers.models import Customer
from customers.serializers import CustomerSerializer
from final_project_django.authorization import KeycloakAuthenticationBackend


# Create your views here.


class CustomerView(
    ReadOnlyModelViewSet,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
