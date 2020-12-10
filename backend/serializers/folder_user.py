from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.user import User

class FolderUserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash', 'passwordConfirmation_hash')
    load_only = ('email', 'password', 'passwordConfirmation')

  password = fields.String(required=True)