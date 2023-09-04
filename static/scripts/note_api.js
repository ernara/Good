const noteTitleInput = $('#note-title');
const noteTextInput = $('#note-text');

function createNoteOnServer() {
    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "notes",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ "title": noteTitleInput.val(), "text": noteTextInput.val() }),
            success: resolve,  
            error: reject      
        });
    });
}

function GetNotesFromServer() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/notes",
            type: "GET",
            success: resolve,  
            error: reject   
        });
    });
}

function deleteNoteOnServer(noteId) {
    $.ajax({
        url: "/notes/" + noteId,
        type: "DELETE",
    });
}

function deleteAllNotesOnServer() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "/notes",
            type: "DELETE",
            success: resolve,  
            error: reject 
        });
    });
}

export {createNoteOnServer, deleteNoteOnServer, GetNotesFromServer, deleteAllNotesOnServer};


