from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import ReadOnlyModelViewSet

from contracts.models import Contract
from contracts.serializers import (
    ContractSerializer,
    ContractPostSerializer,
)
from document_management_backend.authorization import KeycloakAuthenticationBackend


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
