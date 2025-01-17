from flask import Blueprint, jsonify, request
from models.exercises import Exercise
from db import db
from datetime import datetime

excercises_bp = Blueprint('exercises', __name__)

# Get all exercises
@excercises_bp.route('/exercises', methods=['GET', 'OPTIONS'])
@excercises_bp.route('/exercises/', methods=['GET', 'OPTIONS'])  # Allow GET and OPTIONS
def get_exercises():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({"message": "CORS preflight handled"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 200

    # Handle GET request
    exercises = Exercise.query.all()  # Fetch all exercises
    return jsonify([{
        "id": e.id,
        "name": e.name,
        "type": e.type,
        "duration": e.duration,
        "max_heart_rate": e.max_heart_rate,
        "reps": e.reps,
        "weight": e.weight,
        "date": e.date.strftime('%m-%d-%y %H:%M:%S') if e.date else None,  # Format date properly
    } for e in exercises]), 200
# Create a new exercise
excercises_bp.route('/exercises', methods=['POST', 'OPTIONS'])
@excercises_bp.route('/exercises/', methods=['POST', 'OPTIONS'])  # Handles trailing slash
def create_exercise():
    if request.method == 'OPTIONS':
        # Preflight request handling
        response = jsonify({"message": "CORS preflight handled"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 200

    # Handle POST request
    data = request.json
    if not data.get("name") or not data.get("type"):
        return jsonify({"error": "Invalid input"}), 400

    new_exercise = Exercise(
        name=data["name"],
        type=data["type"],
        duration=data.get("duration"),
        max_heart_rate=data.get("max_heart_rate"),
        reps=data.get("reps"),
        weight=data.get("weight"),
        date = datetime.now(),
    )
    db.session.add(new_exercise)
    db.session.commit()
    return jsonify({"id": new_exercise.id, "message": "Exercise created successfully"}), 201

