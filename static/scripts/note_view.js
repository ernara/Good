const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');
const noteArea = $('#notes-container');

import {createNoteOnServer, deleteNoteOnServer, GetNotesFromServer, deleteAllNotesOnServer } from "./note_api.js";

$(document).ready(function() {

    const createNoteButton = $('#create-note');
    createNoteButton.on('click', createNoteOnSite);
    const deleteNotesButton = $('#delete-notes');
    deleteNotesButton.on('click', deleteAllNotesOnSite);

    async function createNoteOnSite() {

        const data = await createNoteOnServer();
        const newNote = $('<div>').addClass('note note' + data.id);
        const title = stripHtml(data.title);
        const text = stripHtml(data.text).replace(/\r\n|\r|\n/g, '<br />');
        const html = `<h3>${title}</h3><p>${text}</p><span class="delete-note" data-id="${data.id}">&times;</span>`;
        newNote.html(html);
        newNote.appendTo(noteArea);
        newNote.draggable(); 
        
        applyDeleteListener(newNote);
        clearNoteForm();
    }

    async function loadNotesOnSite() {
        try {
            const data = await GetNotesFromServer();
                
            if (Array.isArray(data)) {
                const noteArea = $('#notes-container');

                let i =0;
                let boundaries = 1.3
    
                data.forEach(note => {

                    const newNote = $('<div>').addClass('note note' + note.id);
                    const title = stripHtml(note.title);
                    const text = stripHtml(note.text).replace(/\r\n|\r|\n/g, '<br />');
                    const html = `<h3>${title}</h3><p>${text}</p><span class="delete-note" data-id="${note.id}">&times;</span>`;
                    newNote.html(html);
                    newNote.appendTo(noteArea);

                    const top = Math.floor(i / 4) * newNote.height() * boundaries;
                    const left = (i % 4) * newNote.width() * boundaries;
                
                    newNote.css({
                        'position': 'absolute',
                        'top': top + 'px',
                        'left': left + 'px',
                    });
                    newNote.draggable();
    
                    applyDeleteListener(newNote);
                    i++;
                });
            }
        } catch (error) {
            console.error("Error loading notes:", error);
        }
    }

    

    
    function applyDeleteListener(noteElement) {
        $('.delete-note', noteElement).click(function() {
            const noteId = $(this).data('id');
            $(this).closest('.note' + noteId).remove(); 
            deleteNoteOnServer(noteId);
        });
    }

    async function deleteAllNotesOnSite() {
        const confirmed = confirm("Are you sure you want to delete all notes?");
        if (confirmed) {
            await deleteAllNotesOnServer();
            noteArea.empty();
        }
    }

        
    function stripHtml(text) {
        return text.replace(/<\/?[^>]+(>|$)/g, '');
    }
    
    function clearNoteForm() {
        noteTitleInput.val('');
        noteTextInput.val('');
    }

    loadNotesOnSite();
});
