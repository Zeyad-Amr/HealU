
import json
import os
import environ
import base64
import pip._vendor.requests as requests
env = environ.Env(
    DEBUG=(bool, False)
)
from pathlib import Path
import os
ENV_BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(ENV_BASE_DIR, '.env'))
CLIENT_ID = env('PAYPAL_CLIENT_ID')
SECRET_KEY = env('PAYPAL_SECRET_KEY')
baseURL = {
    "sandbox": "https://api-m.sandbox.paypal.com"  # Replace with your base URL
}

def generate_access_token():
    auth = base64.b64encode(f"{CLIENT_ID}:{SECRET_KEY}".encode()).decode()
    url = f"{baseURL['sandbox']}/v1/oauth2/token"
    headers = {
    "Authorization": f"Basic {auth}",
    "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
    "grant_type": "client_credentials"
    }
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        data = response.json()
        access_token = data.get("access_token")
        return access_token 
    else:
        print("Error:", response.status_code, response.text)
        return

def create_online_order(amount, currency='USD'):
    access_token = generate_access_token()
    url = f"{baseURL['sandbox']}/v2/checkout/orders"
    headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {access_token}",
    }
    data = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": currency,  # Define your 'currency' variable
                    "value": amount,  # Define your 'amount' variable
                },
            },
        ],
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    return response.json()

def pay_with_card(amount, card_number, cvv, expiry, name):
    response = create_online_order(amount=amount)
    id = response["id"]
    access_token = generate_access_token()
    url = f"{baseURL['sandbox']}/v2/checkout/orders/{id}/capture"
    headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {access_token}",
    }
    data = {
        "intent": "CAPTURE",
       
        "payment_source":{
            "card":{
                "number":card_number,
                "expiry":expiry,
                "name":name,
                "security_code":cvv
            }
        }
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    return response