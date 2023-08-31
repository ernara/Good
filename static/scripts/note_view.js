const noteArea = $('#notes-container');
const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');

const deleteNote = function() {
    $(this).parent().remove();
};

function createNoteOnSite() {
    const newNote = $('<div>').addClass('note');
    const title = stripHtml(noteTitleInput.val());
    const text = stripHtml(noteTextInput.val()).replace(/\r\n|\r|\n/g, '<br />');
    const html = `<h3>${title}</h3><p>${text}</p><span class="deletenote">&times;</span>`;
    newNote.html(html);
    newNote.appendTo(noteArea).draggable(); 
    applyDeleteListener();
    clearNoteForm();
}

function clearNoteForm() {
    noteTitleInput.val('');
    noteTextInput.val('');
}

function stripHtml(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
}


function applyDeleteListener() {
    $('.deletenote').off('click', deleteNote);
    $('.deletenote').on('click', deleteNote);
}

export {createNoteOnSite}