from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Event
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_restful.utils import cors
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime

app = Flask(__name__)

# Environment variables
app.config.from_envvar('ENV_FILE_LOCATION')

# Postgres connection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Schema
ma = Marshmallow(app)

# API
api = Api(app)
api.decorators = [cors.crossdomain(origin='*')]

# Authorization Token
jwt = JWTManager(app)



# User schema
class User_Schema(ma.Schema):
    class Meta:
        fields = ("id", "email", "password")


# Event schema
class Event_Schema(ma.Schema):
    class Meta:
        fields = ("id", "name", "category", "place", "address", "initial_date", "end_date", "virtual")


# user_schema serializes ONE user
user_schema = User_Schema()
# event_schema serializes ONE event
event_schema = Event_Schema()
# events_schema serializes MANY events
events_schema = Event_Schema(many=True)


class SignUpResource(Resource):
    @cors.crossdomain(origin='*')
    def post(self):
        new_user = User(
            email=request.form.get('email'),
            password=request.form.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)


class LoginResource(Resource):
    @cors.crossdomain(origin='*')
    def post(self):
        user_email = request.form.get('email')
        user_password = request.form.get('password')
        user = User.query.filter_by(email=user_email, password=user_password).first()
        if user == {}:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {'token': access_token}, 200


class EventsResource(Resource):

    @jwt_required
    @cors.crossdomain(origin='*')
    def get(self):
        user_id = get_jwt_identity()
        events = Event.query.filter_by(user_id=user_id)
        return events_schema.dump(events)

    @jwt_required
    @cors.crossdomain(origin='*')
    def post(self):
        user_id = get_jwt_identity()
        new_event = Event(
            name=request.form.get('name'),
            category=request.form.get('category'),
            place=request.form.get('place'),
            address=request.form.get('address'),
            initial_date=request.form.get('initial_date'),
            end_date=request.form.get('end_date'),
            type=request.form.get('type'),
            user_id=user_id,
        )
        db.session.add(new_event)
        db.session.commit()
        return event_schema.dump(new_event)


class SingleEventResource(Resource):
    @jwt_required
    @cors.crossdomain(origin='*')
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        return event_schema.dump(event)

    @jwt_required
    @cors.crossdomain(origin='*')
    def put(self, event_id):
        event = Event.query.get_or_404(event_id)
        if 'name' in request.form:
            event.name = request.form.get('name')
        if 'category' in request.form:
            event.category = request.form.get('category')
        if 'place' in request.form:
            event.place = request.form.get('place')
        if 'address' in request.form:
            event.address = request.form.get('address')
        if 'initial_date' in request.form:
            event.initial_date = request.form.get('initial_date')
        if 'end_date' in request.form:
            event.end_date = request.form.get('end_date')
        if 'virtual' in request.form:
            event.virtual = request.form.get('virtual')
        db.session.commit()
        return event_schema.dump(event)

    @jwt_required
    @cors.crossdomain(origin='*')
    def delete(self, event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return '', 204


api.add_resource(SignUpResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(EventsResource, '/events')
api.add_resource(SingleEventResource, '/events/<int:event_id>')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
