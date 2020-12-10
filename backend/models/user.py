from app import db, bcrypt
from models.base import BaseModel
from models.user_folder import users_folder_join
from models.folder import Folder
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt
from environment.config import secret
from marshmallow import fields
from marshmallow import validates_schema
from flask import request
from marshmallow import ValidationError

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  username = db.Column(db.String(15), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  passwordConfirmation_hash = db.Column(db.String(128), nullable=False)
  folder = db.relationship('Folder', secondary=users_folder_join, backref='users')


  @hybrid_property
  def password(self):
    pass


  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)


  def generate_token(self):
    payload = {
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }

    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token

  @hybrid_property
  def passwordConfirmation(self):
    pass

  @passwordConfirmation.setter
  def passwordConfirmation(self, passwordConfirmation_plaintext):
    self.passwordConfirmation_hash = bcrypt.generate_password_hash(passwordConfirmation_plaintext).decode('utf-8')

  def validate_passwordConfirmation(self, passwordConfirmation_plaintext):
    return bcrypt.check_passwordConfirmation_hash(self.passwordConfirmation_hash, passwordConfirmation_plaintext)