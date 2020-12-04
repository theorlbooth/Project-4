from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.folder import Folder

class PopulateFolderSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    
    model = Folder
    load_instance = True

  users = fields.Nested('FolderUserSchema', many=True)
  places = fields.Nested('PlaceSchema', many=True)