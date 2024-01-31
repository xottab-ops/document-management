"""
Custom JWT Authentication Module for Django Rest Framework
with Keycloak Integration.

This module enables seamless integration between Django Rest Framework (DRF)
andKeycloak for JSON Web Token (JWT) based user authentication.
Users are authenticatedusing JWT tokens issued by Keycloak,
and the module provides flexibility in
configuration for easy adaptation to different Keycloak setups.

Key Features:
- Utilizes JWT tokens for user authentication.
- Integrates with Keycloak for secure and reliable authentication.
- Maps Keycloak roles to Django user permissions.

Usage:
1. Install the module in your Django project.
2. Configure Keycloak server details in your Django settings.
3. Add the custom authentication class to the DRF authentication classes.


"""
import os
import jwt
from django.utils import timezone
from drf_spectacular.extensions import (
    OpenApiAuthenticationExtension,
)
from drf_spectacular.plumbing import build_bearer_security_scheme_object
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions

from users.models import User


CLIENT_SECRET = ""
ALGORITHM = "HS256"


class KeycloakAuthenticationBackend(BaseAuthentication):
    """
    The class of authorization module that
    inherits from the BaseAuthentication module
    """

    keyword = "Bearer"
    CLIENT_SECRET = os.getenv(
        "KEYCLOAK_CLIENT_SECRET",
        "TAKE YOUR SECRET HERE TO LOCAL PERMISSION TO YOUR KEYCLOAK",
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
                key=CLIENT_SECRET,
                algorithms=[ALGORITHM],
                options={"verify_signature": False},
            )
        except Exception:
            return None


class KeycloakAuthenticationScheme(OpenApiAuthenticationExtension):
    """
    An authorization module class that creates
    an authorization scheme for drf_spectacular
    """

    target_class = "final_project_django.authorization.KeycloakAuthenticationBackend"
    name = "BearerToken"
    priority = -1
    match_subclasses = True

    def get_security_definition(self, auto_schema):
        return build_bearer_security_scheme_object(
            header_name="Authorization",
            token_prefix=self.target.keyword,
        )
