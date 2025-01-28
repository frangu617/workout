from flask import Blueprint, jsonify, request
from db import db
from models.user import User

users_bp = Blueprint('users', __name__)

# Sample in-memory users database
users = {
    1: {"username": "john_doe", "email": "john@example.com"},
    2: {"username": "jane_doe", "email": "jane@example.com"}
}

# Get all users
@users_bp.route('/users', methods=['GET'])
def get_users():
    return jsonify(users), 200

# Get a single user
@users_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = users.get(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

# Create a new user
@users_bp.route('/users', methods=['POST'])
def create_user():
    # Handle POST request
    data = request.json
    if not data.get("name") or not data.get("type"):
        return jsonify({"error": "Invalid input"}), 400

    new_user = User(
        name=data["name"],
        age=data["age"],
        gender=data["gender"],
        weight=data["weight"],
        height=data["height"],
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id, "message": "User created successfully"}), 201

# Update an existing user
@users_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = users.get(user_id)
    if user:
        updated_user = request.json
        if not updated_user.get('username') or not updated_user.get('email'):
            return jsonify({"error": "Invalid input"}), 400
        user.update(updated_user)
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

# Delete a user
@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id in users:
        del users[user_id]
        return jsonify({"message": "User deleted"}), 200
    return jsonify({"error": "User not found"}), 404

# Get user stats
@users_bp.route('/users/<int:user_id>/stats', methods=['GET'])
def get_user_stats(user_id):
    user = users.get(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404
