from flask import Flask
from environment.config import db_URI
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import users
from controllers import places
from controllers import countries
from controllers import countries_info
from controllers import cities
# from controllers import search

app.register_blueprint(users.router, url_prefix="/api")
app.register_blueprint(places.router, url_prefix="/api")
app.register_blueprint(countries.router, url_prefix="/api")
app.register_blueprint(countries_info.router, url_prefix="/api")
app.register_blueprint(cities.router, url_prefix="/api")
# app.register_blueprint(search.router, url_prefix="/api")

