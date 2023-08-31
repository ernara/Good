import {createNote} from './note.js'

$(document).ready(function() {

    const createNoteButton = $('#create-note');
    console.log("hey");
    createNote();
    

    createNoteButton.on('click', createNote);
    
});