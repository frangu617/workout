from flask import Flask
from flask_cors import CORS
from db import db
from routes.excercises import excercises_bp
from routes.userStats import users_bp

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS with specific origin
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Initialize the database
db.init_app(app)

# Register blueprints
app.register_blueprint(excercises_bp)
app.register_blueprint(users_bp)

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
