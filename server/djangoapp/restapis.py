import requests
import os
from urllib.parse import urlencode
from dotenv import load_dotenv

load_dotenv()

# Ensure no trailing slashes in URLs
backend_url = os.getenv('backend_url', default="http://localhost:3030").rstrip('/')
sentiment_analyzer_url = os.getenv('sentiment_analyzer_url', default="http://localhost:5050").rstrip('/')

def get_request(endpoint, **kwargs):
    params = urlencode(kwargs)
    request_url = f"{backend_url}/{endpoint}"
    if params:
        request_url += f"?{params}"

    print(f"GET from {request_url}")
    try:
        response = requests.get(request_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Network exception occurred: {e}")
        return None  # Return None or an appropriate fallback value

def analyze_review_sentiments(text):
    request_url = f"{sentiment_analyzer_url}/analyze/{text}"
    try:
        response = requests.get(request_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Network exception occurred: {e}")
        return None

def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url,json=data_dict)
        print(response.json())
        return response.json()
    except:
        print("Network exception occurred")