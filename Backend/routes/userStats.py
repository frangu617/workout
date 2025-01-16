from flask import Blueprint, jsonify

users_bp = Blueprint('users', __name__)

# Sample in-memory users database
users = {
    1: {"username": "john_doe", "email": "john@example.com"},
    2: {"username": "jane_doe", "email": "jane@example.com"}
}

# Get all users
@users_bp.route('/', methods=['GET'])
def get_users():
    return jsonify(users), 200

# Get a single user
@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = users.get(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404
