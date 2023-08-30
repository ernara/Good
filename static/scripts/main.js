$(document).ready(function() {

    function loadNotes() {
        $.get("/notes", function(data) {
            $("#notes-list").empty();
            data.forEach(function(note) {
                var notesList = createNotesList(note);
                $("#notes-list").append(notesList);
            });
        });
    }

    function createNotesList(note) {
        return `<li>${note.title} ${note.text} 
            <button class="update-button" data-id="${note.id}">Update</button>
            <button class="delete-button" data-id="${note.id}">Delete</button>
        </li>
        `;
    }

    function addNote() {
        var title = $("#title").val()
        var text = $("#note").val()
        $.ajax({
            url: "notes",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ "title": title, "text": text }),
            success: function() {
                loadNotes();
                $("#note-content").val("");
            }
        });
    }

    function updateNote(noteId) {
        var newTitle = prompt("Enter new Title:");
        var newText = prompt("Enter new Text:");
        $.ajax({
            url: "/notes/" + noteId,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ "title": newTitle, "text": newText }),
            success: function() {
                loadNotes();
            }
        });
    }

    function deleteItem(noteId) {
        $.ajax({
            url: "/notes/" + noteId,
            type: "DELETE",
            success: function() {
                loadNotes();
            }
        });
    }

    
    $("#add-button").on("click", function() {
        addNote();
    });

    $("#notes-list").on("click", ".update-button", function() {
        var noteId = $(this).data("id");
        updateNote(noteId);
    });

    $("#notes-list").on("click", ".delete-button", function() {
        var noteId = $(this).data("id");
        deleteItem(noteId);
    });

    loadNotes();

});



