from rest_framework import serializers

from .models import Insurance


class InsuranceSerializer(serializers.ModelSerializer):
    client_full_name = serializers.CharField(
        source="client.__str__", read_only=True
    )

    class Meta:
        model = Insurance
        fields = [
            "id",
            "insurance_type",
            "amount",
            "start_date",
            "end_date",
            "client",
            "agency",
            "client_full_name",
        ]

    def validate(self, attrs):
        start_date = attrs.get("start_date", getattr(self.instance, "start_date", None))
        end_date = attrs.get("end_date", getattr(self.instance, "end_date", None))

        if start_date and end_date and end_date <= start_date:
            raise serializers.ValidationError(
                {"end_date": "End date must be after start date."}
            )

        return attrs

