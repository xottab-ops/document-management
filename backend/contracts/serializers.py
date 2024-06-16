from rest_framework import serializers

from contracts.models import Contract
from customers.serializers import CustomerSerializer
from university.serializers import StudentSerializer, StudyGroupSerializer
from users.serializers import UserSerializer


class ContractSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    study_group = StudyGroupSerializer(read_only=True)
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Contract
        fields = [
            "student",
            "customer",
            "study_group",
            "creator",
            "contract_creation_date",
            "contract_expiration_date",
            "contract_price",
        ]


class ContractPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            "student",
            "customer",
            "study_group",
            "creator",
            "contract_creation_date",
            "contract_expiration_date",
            "contract_price",
        ]

