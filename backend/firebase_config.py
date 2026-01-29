import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
cred_path = "serviceAccountKey.json" 
try:
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin Initialized Successfully.")
    else:
        print(f"Warning: {cred_path} not found. Firebase features will be disabled/mocked.")
except ValueError:
    pass
def get_db():
    if firebase_admin._apps:
        return firestore.client()
    return None
def verify_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"Token Verification Failed: {e}")
        return None