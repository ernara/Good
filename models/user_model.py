from db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    oauth2_token = db.Column(db.String(100))

    notes = db.relationship('Note', backref='user', lazy=True)

    def __init__(self, username, email, password, oauth2_token=None):
        self.username = username
        self.email = email
        self.password = password
        self.oauth2_token = oauth2_token

    def __repr__(self):
        return f"<User {self.username}>"
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'oauth2_token': self.oauth2_token
        }

