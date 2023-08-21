from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
import jwt
import datetime
from config import app, db, api, Migrate, Flask


parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True, help='Username is required')
parser.add_argument('password', type=str, required=True, help='Password is required')

class SignupResource(Resource):
    def post(self):
        data = parser.parse_args()
        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(username=data['username'], password=hashed_password)
        new_user.save_to_db()
        return {'message': 'User created successfully'}, 201

class LoginResource(Resource):
    def post(self):
        data = parser.parse_args()
        user = User.find_by_username(data['username'])

        if user and check_password_hash(user.password, data['password']):
            token = jwt.encode({'username': user.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
            return {'token': token}, 200

        return {'message': 'Invalid credentials'}, 401