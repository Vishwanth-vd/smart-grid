from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import requests
from agent import SmartGridAgent
from firebase_config import get_db, verify_token
from firebase_admin import firestore
from users import create_user_profile, get_user_profile, log_ai_decision
app = Flask(__name__)
CORS(app)
agent = SmartGridAgent()
API_KEY = "ec61f58699dc42189e2161644252801"
BASE_URL = "http://api.weatherapi.com/v1"
history_data = []
users_db = {
    "admin@grid.os": {"password": "password", "role": "admin", "uid": "admin1"},
    "user@grid.os": {"password": "password", "role": "user", "uid": "user1"}
}
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = users_db.get(email)
    if user and user['password'] == password:
        return jsonify({
            'uid': user['uid'],
            'email': email,
            'role': user['role']
        })
    return jsonify({'error': 'Invalid credentials'}), 401
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user') 
    if email in users_db:
        return jsonify({'error': 'User already exists'}), 400
    users_db[email] = {
        'password': password,
        'role': role,
        'uid': f"user_{len(users_db) + 1}"
    }
    return jsonify({
        'uid': users_db[email]['uid'],
        'email': email,
        'role': role
    })
def get_weather_data(city):
    try:
        url = f"{BASE_URL}/forecast.json?key={API_KEY}&q={city}&days=1&aqi=no&alerts=no"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            current = {
                "temp_c": data['current']['temp_c'],
                "feelslike_c": data['current']['feelslike_c'],
                "humidity": data['current']['humidity'],
                "condition": data['current']['condition'], 
                "is_day": data['current']['is_day'],
                "wind_kph": data['current']['wind_kph'],
                "location": data['location']['name']
            }
            forecast_hours = data['forecast']['forecastday'][0]['hour']
            return current, forecast_hours
        else:
            print(f"WeatherAPI Error: {response.status_code} - {response.text}")
            return None, None
    except Exception as e:
        print(f"Weather Fetch Failed: {e}")
        return None, None
def get_mock_weather():
    return {
        "temp_c": random.uniform(15, 35),
        "feelslike_c": random.uniform(15, 35),
        "humidity": random.randint(30, 90),
        "condition": {"text": random.choice(["Sunny", "Cloudy", "Rain", "Windy"]), "icon": "", "code": 1000},
        "is_day": 1,
        "wind_kph": random.uniform(5, 25),
        "location": "Simulated Node"
    }, []
def calculate_demand(weather_data):
    temp = weather_data.get('temp_c', 25)
    humidity = weather_data.get('humidity', 50)
    is_day = weather_data.get('is_day', 1)
    demand = 40 
    if is_day:
        demand += 10 
    if temp > 25:
        demand += (temp - 25) * 2.5
    elif temp < 10:
        demand += (10 - temp) * 1.5 
    if humidity > 75:
        demand += 5
    demand += random.uniform(-2, 2)
    return min(max(demand, 0), 100)
@app.route('/weather', methods=['GET'])
def get_weather_route():
    city = request.args.get('city', 'London')
    current, _ = get_weather_data(city)
    if current:
        return jsonify(current)
    else:
        return jsonify({"error": "Failed to fetch weather data"}), 500
@app.route('/grid-status', methods=['GET'])
def get_grid_status():
    city = request.args.get('city', 'London')
    current_weather, forecast_hours = get_weather_data(city)
    if not current_weather:
        print(f"Using Mock Data for {city}")
        current_weather, forecast_hours = get_mock_weather()
        current_weather['location'] = city
    current_load = round(calculate_demand(current_weather), 2)
    try:
        agent_result = agent.run_agent_loop(current_weather, current_load, forecast_hours)
    except Exception as e:
        print(f"Agent Error: {e}")
        agent_result = {
            "risk_score": 0, "status": "Unknown", "decision": "Agent Offline", 
            "explanation": "Internal Logic Error", "actions": []
        }
    response = {
        "timestamp": datetime.datetime.now().isoformat(),
        "weather": current_weather,
        "grid": {
            "current_load": current_load,
            "unit": "MW"
        },
        "agent": agent_result
    }
    log_ai_decision(city, response)
    db = get_db()
    if db:
        try:
            db.collection('grid_logs').add({
                "timestamp": firestore.SERVER_TIMESTAMP,
                "city": city,
                "risk_score": agent_result['risk_score'],
                "load": current_load,
                "status": agent_result['status']
            })
        except Exception as e:
            print(f"Log error: {e}")
    history_data.append({
        "time": datetime.datetime.now().strftime("%H:%M:%S"),
        "load": current_load,
        "risk": agent_result['risk_score']
    })
    if len(history_data) > 50:
        history_data.pop(0)
    return jsonify(response)
@app.route('/history', methods=['GET'])
def get_history():
    return jsonify(history_data)
@app.route('/api/profile', methods=['POST'])
def create_profile():
    data = request.json
    profile = create_user_profile(data['uid'], data['email'])
    return jsonify(profile if profile else {'error': 'Failed'}), 200 if profile else 500
@app.route('/api/profile/<uid>', methods=['GET'])
def get_profile(uid):
    profile = get_user_profile(uid)
    return jsonify(profile if profile else {'error': 'Not found'}), 200 if profile else 404
@app.route('/api/admin/multi-region', methods=['POST'])
def multi_region():
    data = request.json
    cities = data.get('cities', [])
    results = []
    for city in cities[:6]:
        current, forecast = get_weather_data(city)
        if not current:
            current, forecast = get_mock_weather()
            current['location'] = city
        if current:
            load = round(calculate_demand(current), 2)
            try:
                agent_result = agent.run_agent_loop(current, load, forecast)
            except:
                agent_result = {"risk_score": 50, "status": "Simulated", "decision": "Data Estimated", "actions": []}
            results.append({
                'city': city,
                'weather': current,
                'load': load,
                'agent': agent_result
            })
    return jsonify({'regions': results})
@app.route('/api/admin/logs', methods=['GET'])
def admin_logs():
    db = get_db()
    if not db:
        return jsonify({'logs': []})
    try:
        docs = db.collection('ai_decisions').order_by('timestamp', direction='DESCENDING').limit(50).stream()
        logs = [doc.to_dict() for doc in docs]
        return jsonify({'logs': logs})
    except:
        return jsonify({'logs': []})
@app.route('/api/chat', methods=['POST'])
def chat_agent():
    data = request.json
    query = data.get('query', '')
    response_text = agent.chat(query)
    return jsonify({
        "response": response_text,
        "timestamp": datetime.datetime.now().isoformat()
    })
if __name__ == '__main__':
    print("🚀 Smart Grid Backend Online")
    app.run(host='0.0.0.0', debug=True, port=5000)