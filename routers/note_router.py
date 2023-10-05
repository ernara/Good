from flask import Blueprint, jsonify, request
from models.note_model import Note
from db import db
from .auth_router import get_token

note_router = Blueprint('note_router', __name__)

@note_router.route('/notes', methods=['GET'])
def get_notes():
    notes = Note.query.filter_by(user_id=get_token()).all()

    notes_list = []
    for note in notes:
        notes_list.append({
            'id': note.id,
            'title': note.title,
            'text': note.text,
            'user_id': note.user_id
        })

    return jsonify(notes_list), 200

@note_router.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    note = Note.query.get(id) 
    
    if note:
        return jsonify(note.serialize())
    else:
        return jsonify({'message': 'Note not found'}), 404

@note_router.route('/notes', methods=['POST'])
def create_note():
    
    data = request.json
    new_note = Note(title=data['title'], text=data['text'], user_id=get_token())  #id pakeisti vėliau
    db.session.add(new_note)  
    db.session.commit()  
    
    return jsonify(new_note.serialize()), 201


@note_router.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    note = Note.query.get(id) 
    
    if note:
        data = request.json
        note.title = data['title']
        note.text = data['text']
        db.session.commit()
        return jsonify(note.serialize())
    else:
        return jsonify({'message': 'Note not found'}), 404

@note_router.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    deleted_note = Note.query.get(id)
    
    if deleted_note:
        db.session.delete(deleted_note)  
        db.session.commit()
        return jsonify({'message': 'Note deleted', 'id': deleted_note.id})
    else:
        return jsonify({'message': 'Note not found'})

from flask import jsonify, request

@note_router.route('/notes', methods=['DELETE'])
def delete_all_notes():
    deleted_count = Note.query.filter_by(user_id=get_token()).delete()
    db.session.commit()
    
    if deleted_count > 0:
        return jsonify({'message': f'{deleted_count} notes deleted'})
    else:
        return jsonify({'message': 'No notes found to delete'})


