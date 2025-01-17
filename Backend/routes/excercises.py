from flask import Blueprint, jsonify, request
from models.exercises import Exercise
from app import db

excercises_bp = Blueprint('exercises', __name__)

# Get all exercises
@excercises_bp.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()  # Fetch all exercises
    return jsonify([{
        "id": e.id,
        "name": e.name,
        "type": e.type,
        "duration": e.duration,
        "max_heart_rate": e.max_heart_rate,
        "reps": e.reps,
        "weight": e.weight
    } for e in exercises]), 200

# Create a new exercise
@excercises_bp.route('/exercises', methods=['POST'])
def create_exercise():
    data = request.json
    if not data.get('name') or not data.get('type'):
        return jsonify({"error": "Invalid input"}), 400
    new_exercise = Exercise(
        name=data['name'],
        type=data['type'],
        duration=data.get('duration'),
        max_heart_rate=data.get('max_heart_rate'),
        reps=data.get('reps'),
        weight=data.get('weight')
    )
    db.session.add(new_exercise)
    db.session.commit()
    return jsonify({"id": new_exercise.id, "message": "Exercise added successfully"}), 201
