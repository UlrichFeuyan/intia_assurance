from rest_framework import filters, viewsets

from .models import Client
from .serializers import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["first_name", "last_name"]
    ordering_fields = ["last_name", "first_name"]
    ordering = ["last_name", "first_name"]

    def get_queryset(self):
        queryset = Client.objects.select_related("agency").all()
        agency_id = self.request.query_params.get("agency")
        if agency_id:
            queryset = queryset.filter(agency_id=agency_id)
        return queryset

