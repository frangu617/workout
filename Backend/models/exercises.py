from sqlalchemy import Boolean, Column, Integer, String, Float, Enum, DateTime
from db import db
from datetime import datetime

class Exercise(db.Model):  # Inherit from db.Model
    __tablename__ = 'exercise'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.Enum('cardio', 'weights', 'Cardio', 'Weights', name='type'), nullable=False)
    duration = db.Column(db.Float, nullable=True)
    max_heart_rate = db.Column(db.Float, nullable=True)
    reps = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Float, nullable=True)
    date = db.Column(db.DateTime, default=datetime.date)  
