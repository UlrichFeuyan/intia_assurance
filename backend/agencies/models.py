from django.db import models


class Agency(models.Model):
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=255)

    class Meta:
        ordering = ["name"]
        verbose_name = "Agency"
        verbose_name_plural = "Agencies"

    def __str__(self) -> str:
        return self.name
