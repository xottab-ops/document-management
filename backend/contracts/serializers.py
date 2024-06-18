from rest_framework import serializers

from contracts.models import Contract
from customers.serializers import CustomerSerializer
from university.serializers import StudentSerializer, StudyGroupSerializer
from users.serializers import UserSerializer


class ContractPrintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    study_group = StudyGroupSerializer(read_only=True)
    creator = UserSerializer(read_only=True)
    contract_creation_date = serializers.DateField(format="%d.%m.%Y")
    contract_expiration_date = serializers.DateField(format="%d.%m.%Y")
    class Meta:
        model = Contract
        fields = [
            "id",
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


class NotificationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    amount = serializers.IntegerField(required=True)
    full_name = serializers.CharField(required=True)
