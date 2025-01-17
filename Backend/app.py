from flask import Flask
from routes.excercises import excercises_bp
from routes.userStats import users_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(excercises_bp)
app.register_blueprint(users_bp)

if __name__ == '__main__':
    app.run(debug=True)