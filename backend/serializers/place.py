from app import ma, db
from serializers.base import BaseSchema
from marshmallow import fields
from models.place import Place

class PlaceSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = Place
    load_instance = True

  user_id = fields.Integer()
  
