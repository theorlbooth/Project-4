from app import db
from models.base import BaseModel
from models.user import User


class Place(db.Model, BaseModel):

  __tablename__ = 'places'

  name = db.Column(db.String(60), nullable=False)
  lat = db.Column(db.Float, nullable=False)
  long = db.Column(db.Float, nullable=False)
  picture = db.Column(db.Text, nullable=True)
  description = db.Column(db.Text, nullable=True)
  place_id = db.Column(db.Text, nullable=False, unique=True)
  score = db.Column(db.Float, nullable=True)


  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', backref='places')