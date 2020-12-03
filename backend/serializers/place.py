from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.place import Place

class PlaceSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = Place
    load_instance = True

  # comments = fields.Nested('CommentSchema', many=True)