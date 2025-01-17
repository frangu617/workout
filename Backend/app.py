from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.excercises import excercises_bp
from routes.userStats import users_bp

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Import models
from models.exercises import Exercise  
from models.user import User  

# Register blueprints
app.register_blueprint(excercises_bp)
app.register_blueprint(users_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)