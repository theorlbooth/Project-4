from app import db
from models.base import BaseModel

class Country(db.Model, BaseModel):

  __tablename__ = 'countries'

  name = db.Column(db.Text, nullable=False, unique=True)
  lat = db.Column(db.Float, nullable=True)
  long = db.Column(db.Float, nullable=True)
  region = db.Column(db.Text, nullable=False)
  subregion = db.Column(db.Text, nullable=True)
  alpha2code = db.Column(db.String(8), nullable=False)

