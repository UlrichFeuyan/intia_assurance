from datetime import date, timedelta

from django.core.management.base import BaseCommand
from agencies.models import Agency
from clients.models import Client
from insurances.models import Insurance


class Command(BaseCommand):
    help = "Create sample data for testing: agencies, clients, and insurances"

    def handle(self, *args, **options):
        # Clear existing data
        Insurance.objects.all().delete()
        Client.objects.all().delete()
        Agency.objects.all().delete()

        # Create agencies
        agencies = [
            Agency.objects.create(name="Assurance Paris", city="Paris"),
            Agency.objects.create(name="Assurance Lyon", city="Lyon"),
            Agency.objects.create(name="Assurance Marseille", city="Marseille"),
        ]

        # Create clients
        clients_data = [
            {"first_name": "Jean", "last_name": "Dupont", "phone": "0601020304", "email": "jean.dupont@email.com", "agency": agencies[0]},
            {"first_name": "Marie", "last_name": "Martin", "phone": "0602030405", "email": "marie.martin@email.com", "agency": agencies[0]},
            {"first_name": "Pierre", "last_name": "Bernard", "phone": "0603040506", "email": "pierre.bernard@email.com", "agency": agencies[1]},
            {"first_name": "Sophie", "last_name": "Lefebvre", "phone": "0604050607", "email": "sophie.lefebvre@email.com", "agency": agencies[1]},
            {"first_name": "Luc", "last_name": "Moreau", "phone": "0605060708", "email": "luc.moreau@email.com", "agency": agencies[2]},
        ]

        clients = [Client.objects.create(**data) for data in clients_data]

        # Create insurances
        today = date.today()
        insurances_data = [
            {
                "insurance_type": "Auto",
                "amount": 1200.00,
                "start_date": today,
                "end_date": today + timedelta(days=365),
                "client": clients[0],
                "agency": agencies[0],
            },
            {
                "insurance_type": "Habitation",
                "amount": 800.00,
                "start_date": today,
                "end_date": today + timedelta(days=365),
                "client": clients[1],
                "agency": agencies[0],
            },
            {
                "insurance_type": "Auto",
                "amount": 1100.00,
                "start_date": today,
                "end_date": today + timedelta(days=365),
                "client": clients[2],
                "agency": agencies[1],
            },
            {
                "insurance_type": "Santé",
                "amount": 500.00,
                "start_date": today,
                "end_date": today + timedelta(days=365),
                "client": clients[3],
                "agency": agencies[1],
            },
            {
                "insurance_type": "Habitation",
                "amount": 900.00,
                "start_date": today,
                "end_date": today + timedelta(days=365),
                "client": clients[4],
                "agency": agencies[2],
            },
        ]

        Insurance.objects.bulk_create([Insurance(**data) for data in insurances_data])

        self.stdout.write(self.style.SUCCESS("✓ Sample data created successfully!"))
        self.stdout.write(f"  - {len(agencies)} agencies")
        self.stdout.write(f"  - {len(clients)} clients")
        self.stdout.write(f"  - {len(insurances_data)} insurances")
