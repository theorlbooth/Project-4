from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.user import User
from marshmallow import validates_schema
from flask import request
from marshmallow import ValidationError


class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash', 'passwordConfirmation_hash')
    load_only = ('email', 'password', 'passwordConfirmation')

  @validates_schema
  def check_passwords_match(self, data, **kwargs):
    if request.method == 'POST':
      if data['password'] != data['passwordConfirmation']:
        raise ValidationError(
          'Passwords do not match',
          'passwordConfirmation'
        )

  passwordConfirmation = fields.String(required=False)
  folder = fields.Nested('FolderSchema', many=True)
  password = fields.String(required=True)
