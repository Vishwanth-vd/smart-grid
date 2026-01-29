
import requests
import json

url = "http://127.0.0.1:5000/api/chat"
payload = {"message": "What is the current risk?"}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
