from app import db

places_folder_join = db.Table('places_folder',

  db.Column('folder_id', db.Integer, db.ForeignKey('folders.id'), primary_key=True),
  db.Column('place_id', db.Integer, db.ForeignKey('places.id'), primary_key=True)
  )