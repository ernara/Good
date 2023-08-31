from flask import Blueprint, jsonify, request
from models.note_model import Note

note_router = Blueprint('note_router', __name__)

notes = [
]

@note_router.route('/notes', methods=['GET'])
def get_notes():
        notes_list = []
        for note in notes:
            notes_list.append({
                'id': note.id,
                'title': note.title,
                'text': note.text
            })

        return jsonify(notes_list), 200

@note_router.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    for note in notes:
        if note.id == id:
            return jsonify(note.__dict__)
    
    return jsonify({'message': 'Note not found'}), 404

@note_router.route('/notes', methods=['POST'])
def create_note():
    data = request.json
    new_note = Note(len(notes) + 1, data['title'], data['text'])
    notes.append(new_note)
    return jsonify(new_note.__dict__), 201

@note_router.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    for note in notes:
        if note.id == id:
            data = request.json
            note.title = data['title']
            note.text = data['text']
            return jsonify(note.__dict__)
    return jsonify({'message': 'Note not found'}), 404

@note_router.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    global notes
    deleted_note = None
    
    for note in notes:
        if note.id == id:
            deleted_note = note
            notes.remove(note)
            break
    
    if deleted_note:
        return jsonify({'message': 'Note deleted', 'id': deleted_note.id})
    else:
        return jsonify({'message': 'Note not found'})


