from firebase_config import get_db, verify_token
from firebase_admin import firestore
from flask import jsonify, request
from functools import wraps
db = get_db()
def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token'}), 401
        user = verify_token(token.replace('Bearer ', ''))
        if not user:
            return jsonify({'error': 'Invalid token'}), 401
        request.user = user
        return f(*args, **kwargs)
    return wrapper
def require_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not hasattr(request, 'user'):
            return jsonify({'error': 'Unauthorized'}), 401
        profile = get_user_profile(request.user['uid'])
        if not profile or profile.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return wrapper
def create_user_profile(uid, email):
    if not db:
        return None
    try:
        profile = {
            'uid': uid,
            'email': email,
            'role': 'user',
            'location': 'London',
            'created_at': firestore.SERVER_TIMESTAMP
        }
        db.collection('users').document(uid).set(profile)
        return profile
    except Exception as e:
        print(f"Profile creation error: {e}")
        return None
def get_user_profile(uid):
    if not db:
        return {'uid': uid, 'role': 'user', 'location': 'London'}
    try:
        doc = db.collection('users').document(uid).get()
        return doc.to_dict() if doc.exists else None
    except:
        return None
def update_user_role(uid, new_role):
    if not db:
        return False
    try:
        db.collection('users').document(uid).update({'role': new_role})
        return True
    except:
        return False
def log_ai_decision(city, data):
    if not db:
        return
    try:
        db.collection('ai_decisions').add({
            'timestamp': firestore.SERVER_TIMESTAMP,
            'city': city,
            'weather': data.get('weather'),
            'risk_score': data.get('agent', {}).get('risk_score'),
            'status': data.get('agent', {}).get('status'),
            'explanation': data.get('agent', {}).get('explanation')
        })
    except Exception as e:
        print(f"Log error: {e}")