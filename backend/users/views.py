from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet

from document_management_backend.authorization import KeycloakAuthenticationBackend
from users.models import User
from users.serializers import UserIDSerializer


# Create your views here.


class UserIDViewSet(ReadOnlyModelViewSet):
    authentication_classes = (KeycloakAuthenticationBackend,)
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserIDSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        if username is None:
            return super().get_queryset()
        return super().get_queryset().filter(username=username)

    def retrieve(self, request, pk=None, **kwargs):
        try:
            user = User.objects.get(username=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserIDSerializer(user)
        return Response(serializer.data)
