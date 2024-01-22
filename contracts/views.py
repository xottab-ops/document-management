from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import ReadOnlyModelViewSet

from contracts.models import Contract, ContractStatus
from contracts.serializers import (
    ContractSerializer,
    ContractStatusSerializer,
    ContractPostSerializer,
)
from final_project_django.authorization import KeycloakAuthenticationBackend


# Create your views here.


class ContractsView(ReadOnlyModelViewSet, mixins.CreateModelMixin):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return ContractPostSerializer
        return super().get_serializer_class()


class ContractStatusView(
    ReadOnlyModelViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin
):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = ContractStatus.objects.all()
    serializer_class = ContractStatusSerializer
