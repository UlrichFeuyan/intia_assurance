from rest_framework import serializers

from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    agency_name = serializers.CharField(source="agency.name", read_only=True)

    class Meta:
        model = Client
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone",
            "email",
            "agency",
            "agency_name",
        ]

