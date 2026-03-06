from flask import Flask, jsonify, request
from flask_cors import CORS
import model as ml

app = Flask(__name__)
CORS(app)

# Train when server starts
print("🔄 Training model...")
ml.train()
print("✅ Model ready!")

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    return jsonify(ml.metrics)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    result = ml.predict_signal(
        data['distance'],
        data['obstacles'],
        data['frequency'],
        data['weather'],
        data['interference'],
        data['tower_height']
    )
    return jsonify({"signal": result})

@app.route('/api/train', methods=['POST'])
def retrain():
    metrics = ml.train()
    return jsonify(metrics)

if __name__ == '__main__':
    app.run(debug=True, port=5000)