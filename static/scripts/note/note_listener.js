const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');

import {createNoteOnSite, deleteAllNotesOnSite, loadNotesOnSite} from "./note_view.js";

$(document).ready(function () {

    const createNoteButton = $('#create-note');
    createNoteButton.on('click', createNoteOnSite);
    const deleteNotesButton = $('#delete-notes');
    deleteNotesButton.on('click', deleteAllNotesOnSite);
    const sortNotesButton = $('#sort-notes');
    sortNotesButton.on('click', loadNotesOnSite);

    noteTitleInput.on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            noteTextInput.focus(); 
        }
    });

    noteTitleInput.on('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault(); 
            noteTextInput.focus(); 
        }
    });

    noteTextInput.on('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault(); 
            const startPos = this.selectionStart;
            const endPos = this.selectionEnd;
            const text = this.value;
            this.value = text.substring(0, startPos) + '    ' + text.substring(endPos);
            this.selectionStart = this.selectionEnd = startPos + 4;
        } else if (e.key === 'Enter') {
            if (e.shiftKey) {
                e.preventDefault(); 
                const startPos = this.selectionStart;
                const text = this.value;
                this.value = text.substring(0, startPos) + '\n' + text.substring(startPos);
                this.selectionStart = this.selectionEnd = startPos + 1;
            } else {
                e.preventDefault(); 
                createNoteOnSite(); 
            }
        }
    });
    
    loadNotesOnSite();
});