

# 📡 5G Signal Strength Predictor (ML + React + Flask)

🌍 **Live Demo**

| Service        | URL                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------ |
| 🌐 Frontend    | [https://5g-signal-app.vercel.app](https://5g-signal-app.vercel.app)                       |
| ⚙️ Backend API | [https://fiveg-signal-predictor.onrender.com](https://fiveg-signal-predictor.onrender.com) |

---

# 🎯 Project Overview

The **5G Signal Strength Predictor** is a **full-stack Machine Learning web application** that simulates real-world **5G signal conditions** and predicts **signal strength in dBm**.

Users can adjust **6 environmental parameters**, and the system instantly predicts signal strength using a **Random Forest Machine Learning model**.

---

# 🧭 Parameters You Can Control

The app simulates realistic telecom conditions using the following inputs:

| Parameter              | Description                          |
| ---------------------- | ------------------------------------ |
| 📏 Distance from Tower | Distance between user and 5G tower   |
| 🧱 Obstacles (Walls)   | Number of walls blocking signal      |
| 📡 Frequency Band      | 5G frequency band (28 / 39 / 60 GHz) |
| 🌧️ Weather Severity   | Rain / humidity conditions           |
| 📶 Interference Level  | Environmental signal noise           |
| 🗼 Tower Height        | Height of the 5G tower               |

---

# 📶 Signal Quality Classification

| Signal (dBm) | Quality      |
| ------------ | ------------ |
| ≥ −65        | 🟢 Excellent |
| −65 to −75   | 🟡 Good      |
| −75 to −85   | 🟠 Fair      |
| −85 to −95   | 🔴 Poor      |
| < −95        | ⛔ No Signal  |

---

# 🧠 Machine Learning Approach

## Dataset

The dataset contains **300 synthetic RF samples** generated using the **Free Space Path Loss (FSPL) physics formula**.

### Signal Formula

```
signal = -20 × log10(distance)
       - 20 × log10(frequency)
       - 32.45
       + tower_height × 0.3
       - obstacles × 3.0
       - weather × 5.0
       - interference × 0.5
       + noise
```

This combines **real RF physics + simulated environmental noise**.

---

# 🤖 ML Model

| Feature             | Value                             |
| ------------------- | --------------------------------- |
| Algorithm           | Random Forest Regressor           |
| Trees               | 100 estimators                    |
| Train/Test Split    | 80% / 20%                         |
| Feature Engineering | log10(distance), log10(frequency) |
| Scaling             | StandardScaler                    |

---

# 📊 Model Evaluation

| Metric        | Value  | Meaning                     |
| ------------- | ------ | --------------------------- |
| RMSE          | ~5 dBm | Average prediction error    |
| R² Score      | ~0.97  | Model explains 97% variance |
| Train Samples | 240    | Used for training           |
| Test Samples  | 60     | Used for evaluation         |

---

# 🏗️ Tech Stack

| Layer            | Technology                   | Purpose                        |
| ---------------- | ---------------------------- | ------------------------------ |
| ML Model         | scikit-learn (Random Forest) | Signal prediction              |
| Data Processing  | NumPy + Pandas               | Dataset generation             |
| Backend          | Python + Flask               | REST API                       |
| CORS             | Flask-CORS                   | Frontend-backend communication |
| Server           | Gunicorn                     | Production WSGI server         |
| Frontend         | React 18                     | User interface                 |
| Charts           | Recharts                     | Data visualization             |
| HTTP Client      | Axios                        | API calls                      |
| Backend Hosting  | Render                       | Python deployment              |
| Frontend Hosting | Vercel                       | React deployment               |
| Version Control  | GitHub                       | Source code management         |

---

# 📁 Project Structure

```
5g-signal-predictor/
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── data_generator.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── index.html
│
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   │
│   │   └── components/
│   │       ├── Pipeline.jsx
│   │       ├── Results.jsx
│   │       └── Predictor.jsx
│
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

# 📄 File Responsibilities

## backend/data_generator.py

Generates **300 synthetic RF signal samples** using telecom physics formulas.

Uses:

* NumPy for random simulation
* Free Space Path Loss formula
* Gaussian noise for realism

Outputs a **Pandas DataFrame ready for ML training**.

---

## backend/model.py

Handles **model training and predictions**.

Functions:

* Load generated dataset
* Feature engineering (`log10`)
* Train Random Forest model
* Calculate RMSE and R²
* Return metrics and chart data

Prediction function:

```
predict_signal()
```

Takes **6 input parameters** and returns predicted **signal strength in dBm**.

---

## backend/app.py

Flask **REST API server**.

Endpoints:

| Endpoint       | Method | Description             |
| -------------- | ------ | ----------------------- |
| `/api/metrics` | GET    | Returns model metrics   |
| `/api/train`   | POST   | Retrains ML model       |
| `/api/predict` | POST   | Predict signal strength |

---

# 🖥️ Frontend Components

## App.jsx

Main React component controlling application stages:

```
intro → training → results → prediction
```

---

## Pipeline.jsx

Displays **training progress animation** when the ML model is being trained.

---

## Results.jsx

Shows **model evaluation charts**:

* Metrics dashboard
* Scatter plot (Actual vs Predicted)
* Residual error chart
* Feature importance graph

---

## Predictor.jsx

Interactive **live prediction tool**.

Features:

* 6 sliders for inputs
* API call to `/api/predict`
* Displays signal strength in **dBm**
* Provides **tips to improve signal**

---

# ⚙️ Local Installation

## Prerequisites

* Python **3.10+**
* Node.js **18+**
* Git

---

# 1️⃣ Clone Repository

```bash
git clone https://github.com/bonamukkala-bot/5G-signal-predictor.git
cd 5G-signal-predictor
```

---

# 2️⃣ Setup Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at:

```
http://localhost:5000
```

Expected output:

```
Training model...
Model ready!
Running on http://127.0.0.1:5000
```

---

# 3️⃣ Setup Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 4️⃣ Open Application

Visit in browser:

```
http://localhost:3000
```

---

# 📦 Backend Dependencies

```
flask
flask-cors
numpy
pandas
scikit-learn
gunicorn
```

---

# 📦 Frontend Dependencies

```
react
react-dom
axios
recharts
react-scripts
```

---

# 🔌 API Reference

## Train Model

```
POST /api/train
```

Response

```json
{
  "trainSize": 240,
  "testSize": 60,
  "testRMSE": 4.821,
  "r2": 0.9712,
  "scatter": [],
  "residuals": [],
  "featureWeights": []
}
```

---

## Predict Signal

```
POST /api/predict
```

Request

```json
{
  "distance": 150,
  "obstacles": 2,
  "frequency": 28,
  "weather": 0.3,
  "interference": 3,
  "tower_height": 30
}
```

Response

```json
{
  "signal": -78.43
}
```

---

# 🚀 Deployment

## Backend — Render

1. Create **New Web Service**
2. Connect GitHub repo
3. Configure:

```
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Instance Type: Free
```

---

## Frontend — Vercel

1. Create **New Project**
2. Import GitHub repo
3. Configure:

```
Root Directory: frontend
Framework: Create React App
```

Deploy.

---

# 📊 Key Learnings

This project demonstrates:

✔ How **telecom RF physics can be converted into ML features**
✔ How **Random Forest works with ensemble decision trees**
✔ Building a **Flask REST API for ML models**
✔ Connecting **React frontend with Python backend**
✔ Deploying a **full-stack ML app for free**
✔ Understanding **RMSE and R² for model evaluation**


If you want, I can also give you **a much more professional README used by top GitHub ML projects (with badges, architecture diagram, screenshots, and GIF demo)**. That will make your project look **10x more impressive to recruiters.**
