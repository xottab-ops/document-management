from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from contracts.models import Contract
from contracts.serializers import (
    ContractSerializer,
    ContractPostSerializer,
    ContractPrintSerializer,
)
from document_management_backend.authorization import KeycloakAuthenticationBackend


from django.http import HttpResponse

from document_management_backend.scripts.generate_docx import generate


# Create your views here.


class ContractsView(ReadOnlyModelViewSet, mixins.CreateModelMixin):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all().order_by('id')
    serializer_class = ContractSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return ContractPostSerializer
        return super().get_serializer_class()


class ContractViewSet(ReadOnlyModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractPrintSerializer

    @action(detail=True, methods=['get'], url_path='generate_document')
    def generate_document(self, request, pk=None):
        try:
            contract = self.get_object()
        except Contract.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        file = generate(contract)

        response = HttpResponse(file.getvalue(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = f'attachment; filename=contract_{contract.id}.docx'
        return response
