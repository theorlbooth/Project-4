from flask import Blueprint, request
from models.place import Place
from serializers.place import PlaceSchema
from marshmallow import ValidationError

place_schema = PlaceSchema()
# populate_place = PopulatePlaceSchema() 
# ! when did we use populate.. to add notes and comments???

router = Blueprint(__name__, 'places')

@router.route('/places', methods=['GET'])
def index():
  places = Place.query.all()
  print(places)
  return place_schema.jsonify(places, many=True), 200

@router.route('/places<int:id>', methods=['GET'])
def get_single_place(id):
  place = Place.query.get(id)

  if not place:
    return { 'message': 'Place not available' }, 404

  return place_schema.jsonify(place), 200


@router.route('/places', methods=['POST'])
def create():
  place_dictionary = request.get_json()

  try:
    place = place_schema.load(place_dictionary)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  place.save()

  return place_schema.jsonify(place), 200

  