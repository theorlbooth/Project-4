from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema
from marshmallow import ValidationError
from middleware.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/register', methods=['POST'])
def register():
  request_body = request.get_json()

  email = User.query.filter_by(email=request_body['email']).first()
  username = User.query.filter_by(username=request_body['username']).first()
  if username and email:
    return { 'errors' : {'username':'Username in use', 'email': 'Email in use'} }
  elif email:
    return { 'errors' : {'email': 'Email in use'} }
  elif username:
    return { 'errors' : {'username':'Username in use'} }

  new_user = user_schema.load(request_body)
  new_user.save()
  return user_schema.jsonify(new_user), 200


@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'Unauthorized Login Attempt' }

  if not user.validate_password(data['password']):
    return { 'message': 'Unauthorized Login Attempt' }

  token = user.generate_token()

  return { 'token': token, 'message': 'Welcome back!' }, 200


@router.route('/users/<int:id>', methods=['GET'])
@secure_route
def get_single_user(id):
  user = User.query.get(id)

  if not user:
    return { 'message': 'User not available!' }, 404
  
  return user_schema.jsonify(user), 200
