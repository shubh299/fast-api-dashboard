import requests
import json
from faker import Faker
import random
import sys


def seed_leads(num_leads: int):
    fake = Faker()
    add_lead_url = "http://127.0.0.1:8000/lead"
    for _ in range(num_leads):
        data = {
            "name": fake.name(),
            "email": fake.email(),
            "company": fake.company(),
            "engaged": random.getrandbits(1),
            "stage": random.randint(0, 3),
        }
        response = requests.post(add_lead_url, json.dumps(data))
        print(response.status_code, response.content, data)


leads_count = int(sys.argv[1] or 147)  # defaulting to 147 count
seed_leads(leads_count)
