import random
import datetime
class SmartGridAgent:
    def __init__(self):
        self.context = {}
        self.risk_score = 0
        self.status = "Normal"
        self.decision = "Grid operating efficiently."
        self.explanation = "Load and weather conditions are within optimal ranges."
        self.preventive_actions = []
    def sense(self, weather_data, current_load, forecast_data=None):
        self.context['weather'] = weather_data
        self.context['load'] = current_load
        self.context['forecast'] = forecast_data or []
        self.context['time'] = datetime.datetime.now()
        self.temp = weather_data.get('temp_c', 25) 
        self.humidity = weather_data.get('humidity', 50)
        self.is_day = weather_data.get('is_day', 1)
        self.condition = weather_data.get('condition', {}).get('text', 'Clear')
    def predict_demand(self):
        prediction = self.context['load']
        if self.context['forecast']:
            next_hour_temp = self.context['forecast'][0].get('temp_c', self.temp)
            if next_hour_temp > self.temp:
                prediction *= 1.05 
            elif next_hour_temp < self.temp:
                prediction *= 0.98 
        current_hour = self.context['time'].hour
        if 17 <= current_hour <= 21:
            prediction *= 1.10
        return round(prediction, 2)
    def calculate_emissions(self):
        emissions = self.context['load'] * 0.4 
        return round(emissions, 2)
    def think(self):
        score = 0
        reasons = []
        if self.temp > 35:
            score += 30
            reasons.append(f"High temperature ({self.temp}°C) driving AC load.")
        elif self.temp > 30:
            score += 15
            reasons.append("Warm weather increasing cooling demand.")
        if self.humidity > 80:
            score += 15
            reasons.append(f"High humidity ({self.humidity}%) increasing ventilation needs.")
        if self.context['load'] > 85:
            score += 40
            reasons.append(f"Critical base load ({self.context['load']}%) detected.")
        elif self.context['load'] > 70:
            score += 20
            reasons.append("Grid load is entering high tier.")
        future_spike = False
        if self.context['forecast']:
            for hour in self.context['forecast'][:3]:
                if hour.get('temp_c', 0) > self.temp + 2:
                    future_spike = True
                    break
        if future_spike:
            score += 10
            reasons.append("Forecast predicts rising temperatures in next 3 hours.")
        self.risk_score = min(max(score, 0), 100)
        self.context['risk_reasons'] = reasons
        return self.risk_score
    def act(self):
        self.preventive_actions = []
        if self.risk_score >= 71:
            self.status = "CRITICAL"
            self.decision = "High overload risk detected!"
            self.preventive_actions = [
                "Issue Red Alert to Admin Dashboard",
                "Throttle non-essential industrial capabilities",
                "Notify users to reduce AC usage immediately"
            ]
        elif self.risk_score >= 41:
            self.status = "WARNING"
            self.decision = "Potential load strain monitored."
            self.preventive_actions = [
                "Activate reserve generators (Standby)",
                "Send 'Energy Saver' push notification to mobile users",
                "Monitor substation transformers temperature"
            ]
        else:
            self.status = "NORMAL"
            self.decision = "Grid functioning normally."
            self.preventive_actions = [
                "Perform scheduled maintenance checks",
                "Optimize storage battery charging"
            ]
    def explain(self):
        reasons_text = " ".join(self.context.get('risk_reasons', []))
        if not reasons_text:
            reasons_text = "Conditions are stable."
        explanation = (
            f"**Decision**: {self.decision}\n"
            f"**Reasoning**: {reasons_text}\n"
            f"**Context**: Temp {self.temp}°C, Load {self.context['load']}%, Risk Score {self.risk_score}/100."
        )
        self.explanation = explanation
        return explanation
    def chat(self, user_query):
        query = user_query.lower()
        if "risk" in query:
            return f"Current Risk Score is {self.risk_score}/100. Status: {self.status}. {self.explanation}"
        elif "load" in query or "demand" in query:
            return f"Current Grid Load is {self.context.get('load', 'Unknown')} MW. Prediction for next hour is {self.predict_demand()} MW."
        elif "weather" in query or "temp" in query:
            return f"External conditions: {self.context['weather'].get('temp_c')}°C, {self.context['weather'].get('condition', {}).get('text')}. This is affecting demand by {self.risk_score - (self.context['load'] * 0.4) if self.context.get('load') else 0} points."
        elif "action" in query or "recommend" in query or "do" in query:
            actions = ", ".join(self.preventive_actions)
            return f"I recommend the following protocols: {actions}"
        elif "emission" in query or "co2" in query:
            return f"Current Carbon Emission rate is {self.calculate_emissions()} Tonnes/hour."
        elif "hello" in query or "hi" in query:
            return "Hello, Operator. I am the GridX Sentinel. I am monitoring the grid. Ask me about Risk, Load, or Weather."
        else:
            return f"I am focusing on grid stability. Start your question with 'Risk', 'Load', 'Actions', or 'Weather'. Analysis: {self.decision}"
    def run_agent_loop(self, weather_data, current_load, forecast_data=None):
        self.sense(weather_data, current_load, forecast_data)
        self.think()
        self.act()
        self.explain()
        return {
            "risk_score": self.risk_score,
            "status": self.status,
            "decision": self.decision,
            "explanation": self.explanation,
            "actions": self.preventive_actions,
            "timestamp": self.context['time'].isoformat(),
            "prediction": self.predict_demand(),
            "emissions": self.calculate_emissions()
        }