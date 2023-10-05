from db import db

class User(db.Model):
    __tablename__ = 'user' 

    id = db.Column(db.Integer, primary_key=True)
    oauth2_token = db.Column(db.String(100))

    notes = db.relationship('Note', backref='user', lazy=True)

    def __init__(self, oauth2_token=None):
        self.oauth2_token = oauth2_token

    def serialize(self):
        return {
            'oauth2_token': self.oauth2_token
        }
