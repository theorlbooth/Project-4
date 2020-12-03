from app import db
from models.base import BaseModel


class Place(db.Model, BaseModel):

  __tablename__ = 'places'

  name = db.Column(db.String(60), nullable=False)
  lat = db.Column(db.Float, nullable=False)
  lon = db.Column(db.Float, nullable=False)
  location = db.Column(db.PickleType, nullable=False)
  picture = db.Column(db.Text, nullable=True)
  description = db.Column(db.Text, nullable=True)
  place_id = db.Column(db.String(40), nullable=False, unique=True)
  score = db.Column(db.Float, nullable=True)