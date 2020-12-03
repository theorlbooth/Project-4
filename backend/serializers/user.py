from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.user import User

class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

  password = fields.String(required=True)