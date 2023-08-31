import {createNoteOnServer, DeleteNoteOnServer} from './note_api.js'
import {createNoteOnSite} from './note_view.js'


function createNote()
{
    console.log("1");
    createNoteOnServer();
    console.log("2");

    createNoteOnSite();
    console.log("3");
}

function deleteNote()
{
    DeleteNoteOnServer();
}

export {createNote}
