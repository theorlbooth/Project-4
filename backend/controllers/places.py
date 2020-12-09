from flask import Blueprint, request, g
from models.place import Place
from models.comment import Comment
from models.folder import Folder
from serializers.place import PlaceSchema
from serializers.comment import CommentSchema
from serializers.populate_place import PopulatePlaceSchema
from serializers.populate_folder import PopulateFolderSchema
from serializers.folder_user import FolderUserSchema
from serializers.folder import FolderSchema
from serializers.user import UserSchema
from marshmallow import ValidationError
from middleware.secure_route import secure_route
from marshmallow import fields
from sqlalchemy.sql import text

import os
from dotenv import load_dotenv
load_dotenv()

LAT_LONG_KEY = os.getenv('LAT_LONG_KEY')

import requests

import os
from dotenv import load_dotenv
load_dotenv()

TRIPOSO_API_KEY = os.getenv('TRIPOSO_API_KEY')
TRIPOSO_ACCOUNT = os.getenv('TRIPOSO_ACCOUNT')

place_schema = PlaceSchema()
comment_schema = CommentSchema()
populate_place = PopulatePlaceSchema()
folder_schema = FolderSchema()
populate_folder = PopulateFolderSchema()
user_schema = UserSchema()


router = Blueprint(__name__, 'places')

# # * Get all places ------------
# @router.route('/places', methods=['GET'])
# def index():
#   places = Place.query.all()
#   return place_schema.jsonify(places, many=True), 200

# * Get all places (populated) ------------
@router.route('/places', methods=['GET'])
def pop_index():
  places = Place.query.all()
  return populate_place.jsonify(places, many=True), 200


# * Get single place ------------
@router.route('/places/<int:id>', methods=['GET'])
def get_single_place(id):
  place = Place.query.get(id)
  
  comments = place.comments
  new_comments = comments[::-1]

  place.comments = new_comments


  if not place:
    return { 'message': 'Place not available' }, 404

  return populate_place.jsonify(place), 200


# * Post single place ------------
@router.route('/places', methods=['POST'])
@secure_route
def create():
  place_dictionary = request.get_json()
  place_dictionary['user_id'] = g.current_user.id
  try:
    place = place_schema.load(place_dictionary)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  place.save()

  return populate_place.jsonify(place), 200

# * Put single place ------------
@router.route('/places/<int:id>', methods=['PUT'])
@secure_route
def update_place(id):
  existing_place = Place.query.get(id)

  try:
    place = place_schema.load(
      request.get_json(),
      instance = existing_place,
      partial=True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong. ' }

  place.save()

  return place_schema.jsonify(place), 201


# * Delete single place ------------
@router.route('/places/<int:id>', methods=['DELETE'])
@secure_route
def remove(id):
  place = Place.query.get(id)

  place.remove()
  return { 'message': f'Place {id}-- deleted successfully' }


# * Get all comments ------------
@router.route('/comments', methods=['GET'])
@secure_route
def all_comments():
  comments = Comment.query.all()
  return comment_schema.jsonify(comments, many=True)


# * Get single comment ------------
@router.route('/comments/<int:id>', methods=['GET'])
@secure_route
def single_comment(id):
  comment = Comment.query.get(id)
  
  if not comment:
    return { 'message': 'Comment not available'}, 404

  return comment_schema.jsonify(comment), 200


# * Post single comment ------------
@router.route('/places/<int:place_id>/comments', methods=['POST'])
@secure_route
def add_comment(place_id):
  comment_data = request.get_json()
  comment_data['user_id']= g.current_user.id
  place = Place.query.get(place_id)

  if not place:
    return { 'message': 'Place not available'}, 404
  
  comment = comment_schema.load(comment_data)
  comment.place = place
  comment.save()

  comments = place.comments
  new_comments = comments[::-1]

  place.comments = new_comments
  
  return populate_place.jsonify(place), 200


# * Put single comment ------------
@router.route('/comments/<int:id>', methods=['PUT'])
@secure_route
def put_comment(id):
  existing_comment = Comment.query.get(id)

  if not existing_comment:
    return { 'message': 'Comment not available'}, 404

  try:
    comment = comment_schema.load(
      request.get_json(),
      instance = existing_comment,
      partial = True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong' }
  
  comment.save()

  return comment_schema.jsonify(comment), 201


# * Delete Single Comment ------------
@router.route('/places/<int:place_id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def delete_comment(place_id, comment_id):
  comment = Comment.query.get(comment_id)
  place = Place.query.get(place_id)
  if not comment:
    return { 'message': 'Comment not available' }, 404

  comment.remove()

  comments = place.comments
  new_comments = comments[::-1]

  place.comments = new_comments

  return populate_place.jsonify(place), 200


# * Create folder ------------
@router.route('/folders', methods=['POST'])
@secure_route
def create_folder():
  folder_data = request.get_json()
  user = g.current_user
  user_folder = g.current_user.folder
  folder = folder_schema.load(folder_data)
  user_folder.append(folder)
  user.save()
  folder.save()
  return folder_schema.jsonify(folder), 200

@router.route('/folder', methods=['POST'])
@secure_route
def create_folder_2():
  folder_data = request.get_json()
  user = g.current_user
  user_folder = g.current_user.folder
  folder = folder_schema.load(folder_data)
  user_folder.append(folder)
  user.save()
  folder.save()
  return user_schema.jsonify(user), 200

# * Get folder ------------
@router.route('/folders/<int:id>', methods=['GET'])
def get_folder(id):
  folder = Folder.query.get(id)

  if not folder:
    return { 'message': 'Folder not available' }, 404

  return populate_folder.jsonify(folder), 200


# * Get all folders ------------
@router.route('/folders', methods=['GET'])
def get_folders():
  folders = Folder.query.all()

  return populate_folder.jsonify(folders, many=True), 200


# * Put Folder ------------
@router.route('/folders/<int:id>', methods=['PUT'])
@secure_route
def put_folder(id):
  existing_folder = Folder.query.get(id)

  if not existing_folder:
    return { 'message': 'Folder not available' }, 404

  try:
    folder = folder_schema.load(
      request.get_json(),
      instance = existing_folder,
      partial = True
    )

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong' }

  folder.save()
  return populate_folder.jsonify(folder), 201


# * Delete folder ------------
@router.route('/folders/<int:id>', methods=['DELETE'])
@secure_route
def delete_folder(id):
  folder = Folder.query.get(id)

  if not folder:
    return { 'message': 'Folder not available' }, 404

  folder.remove()
  return { 'message': f'Folder {id} successfully deleted' }


# * Delete place from folder ------------
@router.route('/folders/<int:folder_id>/<int:place_id>', methods=['DELETE'])
@secure_route
def delete_place_from_folder(folder_id, place_id):
  folder = Folder.query.get(folder_id)
  new_folder = [place for place in folder.places if place.id != place_id]
  folder.places = new_folder
  folder.save()
  place = Place.query.get(place_id)
  return populate_place.jsonify(place), 200

@router.route('/folder/<int:folder_id>/<int:place_id>', methods=['DELETE'])
@secure_route
def delete_place_from_folder_2(folder_id, place_id):
  folder = Folder.query.get(folder_id)
  new_folder = [place for place in folder.places if place.id != place_id]
  folder.places = new_folder
  folder.save()
  place = Place.query.get(place_id)
  return populate_folder.jsonify(folder), 200
  

# * Add place to folder ------------
@router.route('/folders/<int:folder_id>/<int:place_id>', methods=['POST'])
def add_place_to_folder(folder_id, place_id):
  place = Place.query.get(place_id)
  folder = Folder.query.get(folder_id)
  id_list = []
  new_folder = []
  for x in folder.places:
      id_list.append(x.id)
      print(id_list)
  if place_id in id_list:
    print('already in folder')
    new_folder = folder.places
  else:
    print('not in folder')
    new_folder = folder.places + [place]

  print(new_folder)
  folder.places = new_folder  
  folder.save()
  
  return populate_place.jsonify(place)


# * Get info for place ------------
@router.route('/place/place_info/<string:lat>/<string:long>', methods=['GET'])
def get_place_info(lat, long):
  print(lat)
  print(long)
  resp = requests.get(f'https://api.opencagedata.com/geocode/v1/json?q={lat},{long}&key={LAT_LONG_KEY}')

  print(resp)

  if not resp:
    return { 'message': 'No results' }, 404

  results = resp.json()
  return results



# #  ! SINGLE PLACE FRONT END REQUEST ---
# #  * If place exists in DB, simple get request
# #  * Else, get from external API and POST to DB

# # * Get single place ------------
@router.route('/places/<string:id>', methods=['GET'])
def get_single_place_id(id):
  place = Place.query.filter(Place.place_id == id).first()

  if not place:

    #  request from external API
    resp = requests.get(f'https://www.triposo.com/api/20201111/poi.json?id={id}&fields=id,name,coordinates,images,score,snippet,location_id,tag_labels&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

    if not resp:
      return { 'message': 'shite' }, 404

    # getting info from response... 
    results_dict = resp.json()
    results_list = results_dict['results']
    place_dict = results_list[0]
    images = place_dict['images']
    image_info = images[0]
    latlon = place_dict['coordinates']
    
    name = place_dict['name']
    place_id = place_dict['id']
    latitude = latlon['latitude']
    longitude = latlon['longitude']
    score = place_dict['score']
    picture = image_info['source_url']
    description = place_dict['snippet']

  # getting poi type
    if place_dict['tag_labels']:
      tag_list = place_dict['tag_labels']
      poi_tag = [tag for tag in tag_list if "poitype" in tag]
      poi = poi_tag[0]
      tag = poi.split('-')
    else:
      tag = 'None'
    
    place_dictionary = {
      'name': name,
      'place_id': place_id,
      'lat': latitude,
      'long': longitude,
      'picture': picture,
      'description': description,
      'score': score,
      'user_id': 1,
      'tags': tag[1],
      'folder': []
    }
    

    try:
      place = populate_place.load(place_dictionary)

    except ValidationError as e:
      return { 'errors': e.messages, 'message': 'hmmm' }

    place.save()


  return populate_place.jsonify(place), 200




@router.route('/day_plan/<string:location>/<string:start_date>/<string:arr_time>/<string:end_date>/<string:dep_time>', methods=['GET'])
def get_trip_plan(location, start_date, arr_time, end_date, dep_time):

  resp = requests.get(f'https://www.triposo.com/api/20201111/day_planner.json?location_id={location}&start_date={start_date}&arrival_time={arr_time}&end_date={end_date}&departure_time={dep_time}&account={TRIPOSO_ACCOUNT}&token={TRIPOSO_API_KEY}')

  if not resp:
    return { 'message': 'No resp!' }, 404
  
  print(resp)

  results = resp.json()
  return results

