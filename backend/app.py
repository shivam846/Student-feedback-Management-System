from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Firebase credentials
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ✅ Only ONE submit_feedback route
@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    data['timestamp'] = datetime.utcnow().isoformat()
    db.collection('feedback').add(data)
    return jsonify({'message': 'Feedback submitted to Firebase'})

@app.route('/get-feedback', methods=['GET'])
def get_feedback():
    feedbacks = db.collection('feedback').stream()
    result = []
    for fb in feedbacks:
        doc = fb.to_dict()
        doc['id'] = fb.id
        result.append(doc)
    return jsonify(result)

@app.route('/delete-feedback/<id>', methods=['DELETE'])
def delete_feedback(id):
    db.collection('feedback').document(id).delete()
    return jsonify({'message': 'Feedback deleted'})

@app.route('/update-feedback/<id>', methods=['PUT'])
def update_feedback(id):
    data = request.json
    db.collection('feedback').document(id).update(data)
    return jsonify({'message': 'Feedback updated'})

if __name__ == '__main__':
    app.run(debug=True)
