from flask import request, g
import jwt
from models.user import User
from environment.config import secret
# from functools import wraps

def secure_route(func):
  # @wraps(func)
  def wrapper(*args, **kwargs):
    raw_token = request.headers['Authorization']
    clean_token = raw_token.replace('Bearer', '')
    print(clean_token)

    try:
      print('does try work')
      payload = jwt.decode(clean_token, secret)
      print('hmmm')
      user_id = payload['sub']
      print('big hmmmmm')
      user = User.query.get(user_id)
      print('user')
      

      if not user:
        return { 'message': 'Unauthorized1' }, 401

      g.current_user = user

    except jwt.ExpiredSignatureError:
        return { 'message': 'Token has expired' }, 401
    
    except Exception as e:
        return e, 401
        

    return func(*args, **kwargs)

  return wrapper