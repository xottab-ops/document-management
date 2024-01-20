from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import mixins
from rest_framework.viewsets import ReadOnlyModelViewSet

from contracts.models import Contract, ContractStatus
from contracts.serializers import (
    ContractSerializer,
    ContractStatusSerializer,
    ContractPostSerializer,
)


# Create your views here.


class ContractsView(ReadOnlyModelViewSet, mixins.CreateModelMixin):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return ContractPostSerializer
        return super().get_serializer_class()


class ContractStatusView(
    ReadOnlyModelViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin
):
    queryset = ContractStatus.objects.all()
    serializer_class = ContractStatusSerializer
