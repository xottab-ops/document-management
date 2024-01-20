from django.shortcuts import render
from rest_framework import mixins, generics
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from customers.models import Customer
from customers.serializers import CustomerSerializer


# Create your views here.


class CustomerView(
    ReadOnlyModelViewSet,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

