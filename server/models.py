from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash


from config import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    user_squishes = db.relationship('UserSquish', back_populates='user')
    squishes = association_proxy('user_squishes', 'squish')

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_password_string):
        byte_object = new_password_string.encode('utf-8')
        encrypted_hash_object = bcrypt.generate_password_hash(byte_object)
        hash_object_as_string = encrypted_hash_object.decode('utf-8')
        self._password_hash = hash_object_as_string

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class UserSquish(db.Model, SerializerMixin):
    __tablename__ = 'user_squishes'

    id = db.Column(db.Integer, primary_key=True)
    squish_id = db.Column(db.Integer, db.ForeignKey('squishes.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)


    squish = db.relationship('Squish', back_populates='user_squishes')
    user = db.relationship('User', back_populates='user_squishes')
    squishes = association_proxy('user', 'squishes')


    serialize_rules = ('-user.user_squishes', '-squish.user_squishes')

class Squish(db.Model, SerializerMixin):
    __tablename__ = "squishes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)

    user_squishes = db.relationship('UserSquish', back_populates='squish')
    users = association_proxy('user_squishes', 'user')

    serialize_rules = ('-user_squishes.squish', '-user_squishes.user.user_squishes')


    @validates('name')
    def validate_squish_name(self, key, new_squish_name):
        if not new_squish_name:
            raise ValueError('Please give the friend a name.')
        return new_squish_name

    def __repr__(self):
        return f"<id: {self.id}, {self.name}>"




