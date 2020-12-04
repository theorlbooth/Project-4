from app import db
from models.base import BaseModel

class Country(db.Model, BaseModel):

  __tablename__ = 'countries'

  name = db.Column(db.String(40), nullable=False, unique=True)
  lat = db.Column(db.Float, nullable=False)
  long = db.Column(db.Float, nullable=False)
  region = db.Column(db.String(40), nullable=False)
  subregion = db.Column(db.String(40), nullable=True)
  alpha2code = db.Column(db.String(8), nullable=False)

