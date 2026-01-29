# How to Run "GridX Smart Grid Analytics" in VS Code

## Prerequisites
1.  **VS Code** installed.
2.  **Python 3.x** installed.
3.  **Node.js** (Optional, for the easiest frontend server).

## Step 1: Backend Setup (Terminal 1)
1.  Open **VS Code**.
2.  Open the project folder (`Grid plus`).
3.  Open a **New Terminal** (`Ctrl + ~`).
4.  Navigate to the project root (if not already there).
5.  **Activate Virtual Environment**:
    *   **Windows (Powershell)**:
        ```powershell
        ./venv/Scripts/Activate
        ```
    *   If you don't have a venv, create one: `python -m venv venv` and then activate inside `venv/Scripts/activate`.
6.  **Install Dependencies** (only needed once):
    ```bash
    pip install flask flask-cors requests
    ```
7.  **Run the Backend Server**:
    ```bash
    python backend/app.py
    ```
    *   You should see: `* Running on http://127.0.0.1:5000`

## Step 2: Frontend Setup (Terminal 2)
1.  Click the **+** icon in the Terminal panel to open a **Second Terminal**.
2.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
3.  **Start the Web Server**:
    *   **Option A (Recommended if Node.js is installed)**:
        ```bash
        npx http-server . -p 8080 -c-1 --cors
        ```
        (This prevents caching issues and handles CORS automatically).
    *   **Option B (Python fallback)**:
        ```bash
        python -m http.server 8080
        ```
4.  You will see: `Available on: http://127.0.0.1:8080`

## Step 3: Open the App
1.  Open your browser (Chrome/Edge).
2.  Go to: [http://127.0.0.1:8080](http://127.0.0.1:8080)
3.  **Note**: If you see old images or a blank screen, perform a **Hard Refresh** (`Ctrl + Shift + R`).

## Verification
*   **Login**: Use `test@grid.com` / `password123`.
*   **Copilot**: Click the AI sidebar and type "Risk status".
