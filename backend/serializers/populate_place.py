from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.place import Place

class PopulatePlaceSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = Place
    load_instance = True

  user_id = fields.Integer()
  comments = fields.Nested('CommentSchema', many=True)
