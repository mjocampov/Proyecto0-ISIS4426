from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# ---------------------- Models ----------------------
# This model represents an user
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True)
    password = db.Column(db.String())
    events = db.relationship('Event', backref='user', lazy=True)

    def __repr__(self):
        return f"{self.email}:{self.password}"


# This model represents an event
class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    category = db.Column(db.String())
    place = db.Column(db.String())
    address = db.Column(db.String())
    initial_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    type = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"{self.name}\n" \
               f"{self.category}\n" \
               f"{self.place}\n" \
               f"{self.address}\n" \
               f"{self.initial_date}\n" \
               f"{self.end_date}\n" \
               f"{self.type}"
