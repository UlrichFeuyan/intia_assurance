from django.db import models

from agencies.models import Agency


class Client(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    agency = models.ForeignKey(
        Agency,
        on_delete=models.CASCADE,
        related_name="clients",
    )

    class Meta:
        ordering = ["last_name", "first_name"]
        indexes = [
            models.Index(fields=["last_name", "first_name"]),
            models.Index(fields=["email"]),
            models.Index(fields=["agency"]),
        ]

    def __str__(self) -> str:
        return f"{self.last_name} {self.first_name}"
