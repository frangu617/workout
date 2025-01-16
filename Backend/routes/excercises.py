from flask import Blueprint, jsonify, request

excercises_bp = Blueprint('items', __name__)

# In-memory database for items
data = {
    1: {"name": "Item 1", "description": "This is the first item."},
    2: {"name": "Item 2", "description": "This is the second item."}
}

# Get all items
@items_bp.route('/', methods=['GET'])
def get_items():
    return jsonify(data), 200

# Get a single item
@items_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = data.get(item_id)
    if item:
        return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

# Create a new item
@items_bp.route('/', methods=['POST'])
def create_item():
    new_id = max(data.keys()) + 1 if data else 1
    new_item = request.json
    if not new_item.get('name') or not new_item.get('description'):
        return jsonify({"error": "Invalid input"}), 400
    data[new_id] = new_item
    return jsonify({"id": new_id, "item": new_item}), 201
