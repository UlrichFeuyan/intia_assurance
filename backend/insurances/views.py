from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Insurance
from .serializers import InsuranceSerializer


class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.select_related("client", "agency").all()
    serializer_class = InsuranceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["agency", "client"]
    search_fields = ["insurance_type"]
    ordering_fields = ["start_date"]
    ordering = ["-start_date"]
