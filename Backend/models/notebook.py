from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    excercise_id = Column(Integer, ForeignKey('exercises.id'))
    date = Column(String)
    
    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, excercise_id={self.excercise_id!r}, date={self.date!r})"
    