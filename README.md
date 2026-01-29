# Smart Grid Analytics PWA

## 1️⃣ OVERALL SYSTEM WORKING (BIG PICTURE)
This project is a Production-Grade Progressive Web Application (PWA) that predicts electricity demand and grid stress using live weather data as a virtual sensor.

Instead of relying on physical Smart meters or IoT sensors, the system uses:
-   ✅ **WeatherAPI** (Current + Forecast)
-   ✅ **Agentic AI** (Rule-based decision agent)
-   ✅ **Firebase Authentication & Firestore**

The goal is **early detection of grid overload and preventive action**, not post-failure analysis.

---

## 2️⃣ MODULE-WISE ARCHITECTURE

### 🔹 MODULE 1: USER AUTHENTICATION (Firebase)
-   **Purpose**: Securely identify users and control access.
-   **Tech**: Firebase Auth (Email/Password), Session Persistence.
-   **Flow**: Login/Register -> Verify Credentials -> Load Role (User/Admin).

### 🔹 MODULE 2: LOCATION & WEATHER DATA (WeatherAPI)
-   **Purpose**: Virtual Grid Sensor.
-   **Data**: Temp, Humidity, Is_Day, Forecast.
-   **Innovation**: Uses real-time weather to model grid physics.

### 🔹 MODULE 3: DEMAND ESTIMATION ENGINE
-   **Logic**:
    -   High Temp = Cooling Load
    -   High Humidity = Ventilation Load
    -   Time of Day = Base Load Patterns
-   **Output**: Demand Index (0–100). Deterministic & Explainable.

### 🔹 MODULE 4: GRID RISK SCORE ENGINE
-   **Core Innovation**: Quantifies stress into a single number (0-100).
-   **Levels**:
    -   🟢 0–40: Low
    -   🟡 41–70: Medium
    -   🔴 71–100: High

### 🔹 MODULE 5: AGENTIC AI (Autonomous)
-   **Loop**: SENSE → THINK → ACT → EXPLAIN.
-   **Function**: Monitors risk, predicts spikes, and issues preventive alerts with human-readable reasoning.

### 🔹 MODULE 6: EARLY WARNING SYSTEM
-   Uses **1-hour prediction** intervals to detect rising trends before they hit critical levels.

### 🔹 MODULE 7: DATA STORAGE (Firestore)
-   Maintains audit trails of User Profiles, Weather Snapshots, and AI Decisions.

### 🔹 MODULE 8: PWA & UI
-   **Features**: Installable, Offline Shell, Service Worker.
-   **Design**: Dark-themed "Control Room" dashboard with Glassmorphism and Real-time Charts.

---

## 3️⃣ USER FLOWS

### 👤 Normal User
1.  Login/Register.
2.  Select City/Region.
3.  View Live Weather & Grid Status.
4.  Receive Agents Alerts & Explanations.

### 🛠️ Admin User
1.  Monitor System Health.
2.  View High-Risk warnings.
3.  Strategic decision making based on Risk Score.

---

## 🚀 How to Run

1.  **Backend**:
    ```bash
    cd backend
    pip install -r requirements.txt
    python app.py
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npx http-server -p 8080 -c-1
    ```
3.  **Access**: Open [http://localhost:8080](http://localhost:8080)
