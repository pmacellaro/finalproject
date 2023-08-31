from flask import request, jsonify, make_response, session
from flask_restful import Resource, reqparse
from models import User, Squish, UserSquish
import jwt
import datetime
from config import app, db, api, Migrate, Flask
from sqlalchemy_serializer import SerializerMixin
from werkzeug.exceptions import NotFound, Unauthorized



parser = reqparse.RequestParser()
parser.add_argument('username', type=str, required=True, help='Username is required')
parser.add_argument('password', type=str, required=True, help='Password is required')

class UsersResource(Resource):
    def get(self,):
        return make_response([user.to_dict() for user in User.query.all()])
    




    def post(self):
        data = request.get_json()

        existing_user = User.query.filter_by(username=data['name']).first()
        if existing_user:
            return make_response({'error': 'Username already exists'}, 409)  # 409 Conflict

        user = User(
            username=data['name'],
            email=data['email'],
            password_hash=data['password']
        )
        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        response = make_response(user.to_dict(), 201)
        return response

api.add_resource(UsersResource, '/users')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['name']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            response = make_response(user.to_dict(), 200)
            return response
    except:
        return make_response({'error': 'name or password incorrect'}, 401)


@app.route('/authorized', methods=['GET'])
def authorize():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        response = make_response(user.to_dict(), 200)
        return response
    except:
        return make_response({
            "error": "User not found"
        }, 404)


@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)


@app.before_request
def check_logged_in():
    if (request.endpoint in ['squishes', 'squish/<int:id>', 'logout'] and request.method != 'GET') \
            or request.endpoint == 'authorize':
        if not session.get('user_id'):
            return make_response({'error': "Unauthorized"}, 401)



class Squishes(Resource):
    def get(self):
        return make_response([squish.to_dict(rules = ('-user_squishes',)) for squish in Squish.query.all()])

    def post(self):
        data = request.json()
        squish = Squish(
            name = data['name'],
            image = data['image'],
            bio = data['bio']
        )
        db.session.add(squish)
        db.session.commit()

        response_dict = {
            "name": squish.name,
            "id": squish.id
        }
        response = make_response(jsonify(response_dict), 201)
        return response
  
api.add_resource(Squishes, '/squishes')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'No User by that id'}, 404)
        return make_response(user.to_dict(), 200)
    
    def patch(self,id):
        user = User.query.filter(User.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(user,attr, data[attr])
        db.session.add(user)
        db.session.commit()

        response_dict = {
            "username": user.username
        }
        response = make_response(response_dict, 200) 
        return response   

api.add_resource(UserById, '/users/<int:id>')

    

class SquishById(Resource):
    def get(self,id):
        squish = Squish.query.filter_by(id=id).first()
        if not squish:
            return make_response({'error': 'That Squish is not born yet.'}, 404)
        return make_response(squish.to_dict(), 200)
    

    def patch(self,id):
        data = request.get_json()
        squish = Squish.query.filter(id=id).first()
        if not squish:
            return make_response({'error': 'That Squish is not born yet.'}, 404)
        for attr in data:
            setattr(squish,attr, data[attr])
        db.session.add(squish)
        db.session.commit()

        response_dict = {
		    "name": squish.name
        }
        response = make_response(response_dict, 200)   
        return response


api.add_resource(SquishById, '/squish/<int:id>')

    
@app.route('/')
def index():
    return '<h1>Phase 5 Server</h1>'

if __name__ == '__main__':
    app.run(port=5000, debug=True)