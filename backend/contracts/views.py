import os

from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

from contracts.models import Contract, Address
from contracts.serializers import (
    ContractSerializer,
    ContractPostSerializer,
    ContractPrintSerializer,
    NotificationSerializer,
    AddressSerializer,
)
from document_management_backend.authorization import KeycloakAuthenticationBackend

from django.http import HttpResponse

from document_management_backend.scripts.generate_docx import generate


class ContractsView(ReadOnlyModelViewSet, mixins.CreateModelMixin):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all().order_by('id')
    serializer_class = ContractSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return ContractPostSerializer
        return super().get_serializer_class()


class ContractViewSet(ViewSet):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all()
    serializer_class = ContractPrintSerializer

    @action(detail=True, methods=['get'], url_path='generate_document')
    def generate_document(self, request, pk=None):
        try:
            contract = get_object_or_404(self.queryset, pk=pk)
        except Contract.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        file = generate(contract)

        response = HttpResponse(file.getvalue(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = f'attachment; filename=contract_{contract.id}.docx'
        return response


class SendNotificationAPIView(ViewSet):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    @action(detail=False, methods=['post'])
    def send_notification(self, request):

        email = request.data.get("email", None)
        full_name = request.data.get('full_name')
        contract_number = request.data.get('contract_number')
        amount = request.data.get('amount')
        subject = 'Уведомление о задолженности'
        recipient_list = [email]
        print(request)
        message = render_to_string("index.html", {
            'full_name': full_name,
            'contract_number': contract_number,
            'amount': amount,
        })

        try:
            send_mail(subject, "", settings.EMAIL_HOST_USER, recipient_list, html_message=message)
            return Response({'message': 'Уведомление успешно отправлено'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddressViewSet(ReadOnlyModelViewSet):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
