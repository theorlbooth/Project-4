from app import ma
from serializers.base import BaseSchema
from models.country import Country

class CountrySchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Country
    load_instance = True
