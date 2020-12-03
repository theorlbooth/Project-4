from app import app, db
from models.user import User

with app.app_context():
  db.drop_all()
  db.create_all()

  sean = User(
    username="sean",
    email="sean@sean.com",
    password="sean"
  )

  sean.save()

  theo = User(
    username="theo",
    email="theo@theo.com",
    password="theo"
  )

  theo.save()
  
  
  print('Users created')

  print('Completed!')