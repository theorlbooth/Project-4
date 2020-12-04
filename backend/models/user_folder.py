from app import db

users_folder_join = db.Table('users_folder',

  db.Column('folder_id', db.Integer, db.ForeignKey('folders.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
  )