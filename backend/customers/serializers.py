from rest_framework import serializers

from customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "name",
            "phone_number",
            "passport_number",
            "passport_issuance",
            "passport_registration",
            "passport_issue_date",
            "passport_division_code",
        ]
