from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.folder import Folder

class FolderSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    
    model = Folder
    load_instance = True
  
  places = fields.Nested('PlaceSchema', many=True)