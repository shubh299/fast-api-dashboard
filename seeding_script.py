import requests
import json
from faker import Faker
import random
import sys
from datetime import date

START_DATE = date(2025, 1, 1)
END_DATE = date(2025, 3, 1)


def seed_leads(num_leads: int, backend_host: str):
    fake = Faker()
    backend_host = backend_host.rstrip("/")
    add_lead_url = f"{backend_host}/lead"
    update_lead_url = f"{backend_host}/update_lead/"

    for i in range(num_leads):
        data = {
            "name": fake.name(),
            "email": fake.email(),
            "company": fake.company(),
            "engaged": random.getrandbits(1),
            "stage": random.randint(0, 3),
        }
        response = requests.post(add_lead_url, json.dumps(data))
        print(response.status_code, response.content, data)

        # populating last connected for half of the inputs
        if i & 1:
            created_id = json.loads(response.content)["id"]
            data = {
                "lastContacted": fake.date_between(START_DATE, END_DATE).strftime(
                    "%Y-%m-%d"
                )
            }
            response = requests.patch(update_lead_url + created_id, json.dumps(data))
            print(response.status_code, response.content, data)


leads_count = int(sys.argv[1] or 147)  # defaulting to 147 count
backend_host = sys.argv[2] or "http://127.0.0.1:8000"
seed_leads(leads_count, backend_host)
