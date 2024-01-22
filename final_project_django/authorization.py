import jwt
from django.utils import timezone
from drf_spectacular.extensions import (
    OpenApiAuthenticationExtension,
)
from drf_spectacular.plumbing import build_bearer_security_scheme_object
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions

from users.models import User

import os

client_secret = ""
ALGORITHM = "HS256"


class KeycloakAuthenticationBackend(BaseAuthentication):
    keyword = "Bearer"
    client_secret = os.getenv(
        "KEYCLOAK_CLIENT_SECRET", "TAKE YOUR SECRET HERE TO LOCAL PERMISSION TO YOUR KEYCLOAK"
    )

    def authenticate(self, request, username=None, password=None):
        decoded = self._decode_jwt(request.headers.get("Authorization"))
        if not decoded:
            return None, None
        exp = decoded.get("exp")
        localtime = timezone.localtime().now().timestamp()
        if exp < localtime:
            raise exceptions.AuthenticationFailed("Expired token")
        username = decoded.get("preferred_username")
        if not username:
            raise exceptions.AuthenticationFailed("No username")
        groups = decoded.get("groups")
        if "xottab-role" not in groups:
            raise exceptions.PermissionDenied(
                "You do not have permission to use this method"
            )
        user = User.objects.filter(username=username).first()
        return user, None

    def _decode_jwt(self, token):
        try:
            token = str.replace(token, "Bearer ", "")
            return jwt.decode(
                jwt=token,
                key=client_secret,
                algorithms=[ALGORITHM],
                options={"verify_signature": False},
            )
        except Exception:
            return None


class KeycloakAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = "final_project_django.authorization.KeycloakAuthenticationBackend"
    name = "BearerToken"
    priority = -1
    match_subclasses = True

    def get_security_definition(self, auto_schema):
        return build_bearer_security_scheme_object(
            header_name="Authorization",
            token_prefix=self.target.keyword,
        )
