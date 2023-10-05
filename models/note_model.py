from db import db
from .user_model import User

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    text = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __init__(self, title, text, user_id=None):
        self.title = title
        self.text = text
        self.user_id = user_id

    def __repr__(self):
        return f"<Note {self.title}>"
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'text': self.text,
            'user_id': self.user_id
        }