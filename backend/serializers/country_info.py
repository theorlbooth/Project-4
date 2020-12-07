from app import ma
from serializers.base import BaseSchema
from models.country_info import CountryInfo

class CountryInfoSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = CountryInfo
    load_instance = True
