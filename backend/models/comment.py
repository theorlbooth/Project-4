from app import db
from models.base import BaseModel
from models.place import Place
from models.user import User

class Comment(db.Model, BaseModel):

  __tablename__ = 'comments'

  content = db.Column(db.Text, nullable=False)
  place = db.relationship('Place', backref='comments')
  place_id = db.Column(db.Integer, db.ForeignKey('places.id'))
  rating = db.Column(db.Float, nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', backref='comments')