from db import db

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    text = db.Column(db.Text)

    def __init__(self, title, text):
        self.title = title
        self.text = text

    def __repr__(self):
        return f"<Note {self.title}>"
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'text': self.text
        }