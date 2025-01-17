from sqlalchemy import Boolean, Column, Integer, String, Float
from sqlalchemy import Enum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Exercise(Base):
    __tablename__ = 'exercise'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(Enum('cardio', 'weights', name='type'))
    duration = Column(Float, nullable=True)
    max_heart_rate = Column(Float, nullable=True)
    reps = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)