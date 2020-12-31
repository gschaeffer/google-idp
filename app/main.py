import json

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.attributes import QueryableAttribute

app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


########## Endpoints 
@app.route('/', methods=['GET'])
def index():
    return 'You are at index :)'


@app.route('/llamas', methods=['GET'])
def llamas():
    print(request.headers.get('custom-header'))
    llamas = Llama.query.all()
    all = []
    [all.append( {"id": str(l.id), "name": l.name} ) for l in llamas]
    return json.dumps(all)


@app.route('/mushrooms', methods=['GET'])
def mushrooms():
    mushrooms = Mushroom.query.all()
    all = []
    [all.append( {"id": str(m.id), "name": m.name} ) for m in mushrooms]
    return json.dumps(all)


@app.route('/users', methods=['GET'])
def users():
    users = User.query.all()
    all = []
    [all.append( {"id": str(u.id), "email": u.email} ) for u in users]
    return json.dumps(all)


########## Entities
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    def __repr__(self):
        return '<User %r>' % self.email


class Llama(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    def __repr__(self):
        return '<Llama %r>' % self.name


class Mushroom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    def __repr__(self):
        return '<Mushroom %r>' % self.name


########## Init db for testing.
@app.route('/init', methods=['GET'])
def init():
    try:
        db.create_all()
        db.session.add_all([
            User(email='user1@mail.com'), 
            User(email='user2@mail.com'),
            User(email='user3@mail.com'),
            Llama(name='Wilbur'), 
            Llama(name='Lola'),
            Llama(name='Bob'),
            Llama(name='Dwayne'),
            Llama(name='Alfie'),
            Llama(name='Dexter'),
            Llama(name='Rocky'),
            Mushroom(name='Oyster'),
            Mushroom(name='Cremini'),
            Mushroom(name='Chanterelle'),
            Mushroom(name='Hedgehog'),
            Mushroom(name='Portobello'),
            Mushroom(name='Lions Main'),
            Mushroom(name='Button'),
            Mushroom(name='King Oyster'),
            Mushroom(name='Porcini'),
            Mushroom(name='Chicken Of The Woods'),
            Mushroom(name='Black Trumpet'),
            Mushroom(name='Wood Blewit'),
            Mushroom(name='Morel'),
            Mushroom(name='Enoki'),
            Mushroom(name='Shiitake'),
            Mushroom(name='Shimeji'),
            Mushroom(name='Maitake'),
            Mushroom(name='Reishi'),
            Mushroom(name='Matsutake'),
            Mushroom(name='Giant Puffball')
        ])
        db.session.commit()
    except Exception as e:
        print(e)
    return 'Initialize db'