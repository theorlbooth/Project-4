from app import db
from models.base import BaseModel


class Place(db.Model, BaseModel):

  __tablename__ = 'places'

  name = db.Column(db.String(60), nullable=False)
  location = db.Column(db.List, nullable=False)
  pictures = db.Column(db.List, nullable=True)
  description = db.Column(db.String(400), nullable=True)
  place_id = db.Column(db.String(40), nullable=False, unique=True)
  score = db.Coulmn(db.Integer(20), nullable=True)