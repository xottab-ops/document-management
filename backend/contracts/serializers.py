from rest_framework import serializers

from contracts.models import Contract, Address
from customers.serializers import CustomerSerializer
from university.serializers import StudentSerializer, StudyGroupSerializer
from users.serializers import UserSerializer



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


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
    address = AddressSerializer(read_only=True)

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
            "address",
            "is_online"
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
    contract_number = serializers.CharField(required=True)
