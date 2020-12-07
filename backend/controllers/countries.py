from flask import Blueprint, request
from models.country import Country
from serializers.country import CountrySchema
from marshmallow import ValidationError

country_schema = CountrySchema()

router = Blueprint(__name__, 'countries')

@router.route('/countries', methods=['GET'])
def index():
  countries = Country.query.all()
  return country_schema.jsonify(countries, many=True), 200