from django.core.exceptions import ValidationError
from django.db import models

from agencies.models import Agency
from clients.models import Client


class Insurance(models.Model):
    insurance_type = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="insurances",
    )
    agency = models.ForeignKey(
        Agency,
        on_delete=models.CASCADE,
        related_name="insurances",
    )

    class Meta:
        ordering = ["-start_date"]

    def clean(self) -> None:
        super().clean()
        if self.end_date and self.start_date and self.end_date <= self.start_date:
            raise ValidationError({"end_date": "End date must be after start date."})

    def __str__(self) -> str:
        return f"{self.insurance_type} - {self.client}"
