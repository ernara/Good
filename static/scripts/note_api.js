const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');

function createNoteOnServer() {
    $.ajax({
        url: "notes",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ "title": noteTitleInput.val(), "text": noteTextInput.val() }),
    });
}

function DeleteNoteOnServer(noteId) {
    $.ajax({
        url: "/notes/" + noteId,
        type: "DELETE",
    });
}

function GetNotesFromServer() {
}

export { createNoteOnServer,  DeleteNoteOnServer, GetNotesFromServer }
