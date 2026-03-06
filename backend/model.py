import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
from data_generator import generate_dataset

model   = None
scaler  = None
metrics = None

def get_features(df):
    df = df.copy()
    df['log_distance']  = np.log10(df['distance'])
    df['log_frequency'] = np.log10(df['frequency'])
    return df[['log_distance', 'obstacles', 'log_frequency',
               'weather', 'interference', 'tower_height']]

def train():
    global model, scaler, metrics

    df = generate_dataset(300)
    X  = get_features(df)
    y  = df['signal']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    scaler    = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s  = scaler.transform(X_test)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_s, y_train)

    y_pred = model.predict(X_test_s)
    rmse   = np.sqrt(mean_squared_error(y_test, y_pred))
    r2     = r2_score(y_test, y_pred)

    scatter = [
        {"actual": round(float(a), 2), "predicted": round(float(p), 2)}
        for a, p in zip(y_test[:40], y_pred[:40])
    ]
    residuals = [
        {"i": i, "residual": round(float(p - a), 2)}
        for i, (a, p) in enumerate(zip(y_test[:40], y_pred[:40]))
    ]
    feature_names = ['log(Distance)', 'Obstacles', 'log(Frequency)',
                     'Weather', 'Interference', 'Tower Height']
    importances = [
        {"name": name, "weight": round(float(imp), 4)}
        for name, imp in zip(feature_names, model.feature_importances_)
    ]

    metrics = {
        "trainSize":      len(X_train),
        "testSize":       len(X_test),
        "testRMSE":       round(rmse, 3),
        "r2":             round(r2, 4),
        "scatter":        scatter,
        "residuals":      residuals,
        "featureWeights": importances,
    }
    return metrics

def predict_signal(distance, obstacles, frequency,
                   weather, interference, tower_height):
    row = pd.DataFrame([{
        'distance':     distance,
        'obstacles':    obstacles,
        'frequency':    frequency,
        'weather':      weather,
        'interference': interference,
        'tower_height': tower_height
    }])
    X   = get_features(row)
    X_s = scaler.transform(X)
    return round(float(model.predict(X_s)[0]), 2)