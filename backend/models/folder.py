from app import db
from models.base import BaseModel

class Folder(db.Model, BaseModel):

  __tablename__ = 'folders'

  name = db.Column(db.String(40), nullable=False)
  public = db.Column(db.Boolean, nullable=False, default=False)

  