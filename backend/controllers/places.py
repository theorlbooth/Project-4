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
from marshmallow import ValidationError
from middleware.secure_route import secure_route
from models.folder_place import places_folder_join


place_schema = PlaceSchema()
comment_schema = CommentSchema()
populate_place = PopulatePlaceSchema()
folder_schema = FolderSchema()
populate_folder = PopulateFolderSchema()


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

  if not place:
    return { 'message': 'Place not available' }, 404

  return place_schema.jsonify(place), 200


# * Post single place ------------
@router.route('/places', methods=['POST'])
def create():
  place_dictionary = request.get_json()

  try:
    place = place_schema.load(place_dictionary)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  place.save()

  return place_schema.jsonify(place), 200

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
def remove(id):
  place = Place.query.get(id)

  place.remove()
  return { 'message': f'Place {id}-- deleted successfully' }


# * Get all comments ------------
@router.route('/comments', methods=['GET'])
def all_comments():
  comments = Comment.query.all()
  return comment_schema.jsonify(comments, many=True)


# * Get single comment ------------
@router.route('/comments/<int:id>', methods=['GET'])
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
  return populate_place.jsonify(place), 200


# * Put single comment ------------
@router.route('/comments/<int:id>', methods=['PUT'])
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
@router.route('/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
  comment = Comment.query.get(id)

  if not comment:
    return { 'message': 'Comment not available' }, 404

  comment.remove()
  return { 'message': f'Comment {id} successfully deleted' }


# * Get folder ------------
@router.route('/folders/<int:id>', methods=['GET'])
def get_folder(id):
  folder = Folder.query.get(id)

  if not folder:
    return { 'message': 'Folder not available' }, 404

  return populate_folder.jsonify(folder), 200


# * Delete folder ------------
@router.route('/folders/<int:id>', methods=['DELETE'])
def delete_folder(id):
  folder = Folder.query.get(id)

  if not folder:
    return { 'message': 'Folder not available' }, 404

  folder.remove()
  return { 'message': f'Folder {id} successfully deleted' }


# * Delete place from folder ------------
@router.route('/folders/<int:folder_id>/<int:place_id>', methods=['DELETE'])
def delete_place_from_folder(folder_id, place_id):
  folder = Folder.query.get(folder_id)
  new_folder = [place for place in folder.places if place.id != place_id]
  folder.places = new_folder
  folder.save()
  return populate_folder.jsonify(folder), 200
  
# * Add place to folder ------------
@router.route('/folders/<int:folder_id>/<int:place_id>', methods=['POST'])
def add_place_to_folder(folder_id, place_id):
  folder = Folder.query.get(folder_id)
  