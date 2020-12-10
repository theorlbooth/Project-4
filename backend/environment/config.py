import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/travel_db')
secret = os.getenv('SECRET', 'This is a secret string')