from flask import Flask
from environment.config import db_URI
from flask_sqlalchemy import flask_sqlalchemy
from flask_marshamllow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import users

app.register_blueprint(users.router, url_prefix="/api")

