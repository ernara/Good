const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');
const noteArea = $('#notes-container');

import { createNoteOnServer, deleteNoteOnServer, GetNotesFromServer, deleteAllNotesOnServer } from "./note_api.js";


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
    noteArea.empty();
    const data = await GetNotesFromServer();

    if (Array.isArray(data)) {
        const noteArea = $('#notes-container');

        let i = 0;
        let inOneCell = Math.round(Math.sqrt(data.length)) + 1;
        let multiplier = 1.3;
        let boundaries = 20
        let height = 0;

        data.forEach(note => {
            const newNote = $('<div>').addClass('note note' + note.id);
            const title = stripHtml(note.title);
            const text = stripHtml(note.text).replace(/\r\n|\r|\n/g, '<br />');
            const html = `<h3>${title}</h3><p>${text}</p><span class="delete-note" data-id="${note.id}">&times;</span>`;
            newNote.html(html);
            newNote.appendTo(noteArea);
            const left = (i % inOneCell) * newNote.width() * multiplier + boundaries;
            if (newNote.height()>height)
            {
                height=newNote.height();
            }

            newNote.css({
                'position': 'absolute',
                'left': left + 'px',
            });
            newNote.draggable();

            applyDeleteListener(newNote);
            i++;
        });

        i=0;

        noteArea.children('.note').each(function(index, element) {
            const $childNote = $(element);
            const childNoteHeight = $childNote.height();
            const top = height * Math.floor(i / inOneCell) * multiplier + boundaries;
            $childNote.css('top', top + 'px');
            i++;
        });
    }
}

function applyDeleteListener(noteElement) {
    $('.delete-note', noteElement).click(function () {
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

export {createNoteOnSite, deleteAllNotesOnSite, loadNotesOnSite}
