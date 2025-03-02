document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("noteForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const notesContainer = document.getElementById("notesContainer");

    // Popup Form
    const editPopup = document.getElementById("editPopup");
    const editTitleInput = document.getElementById("editTitle");
    const editContentInput = document.getElementById("editContent");
    const editForm = document.getElementById("editForm");
    const cancelEditBtn = document.getElementById("cancelEdit");
    
    let editingNoteId = null; // Simpan ID catatan yang sedang diedit

    function loadNotes() {
        fetch("http://localhost:5000/notes") 
            .then(response => response.json())
            .then(data => {
                notesContainer.innerHTML = "";
                data.forEach(note => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${note.title}</td>
                        <td>${note.content}</td>
                        <td>
                            <button class="edit-btn" data-id="${note.id}" data-title="${note.title}" data-content="${note.content}">Edit</button>
                            <button class="delete-btn" data-id="${note.id}">Hapus</button>
                        </td>
                    `;
                    notesContainer.appendChild(row);
                });

                // Event listener untuk tombol Hapus
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const noteId = this.getAttribute("data-id");
                        deleteNote(noteId);
                    });
                });

                // Event listener untuk tombol Edit
                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        editingNoteId = this.getAttribute("data-id");
                        editTitleInput.value = this.getAttribute("data-title");
                        editContentInput.value = this.getAttribute("data-content");
                        editPopup.style.display = "block"; // Tampilkan popup
                    });
                });
            })
            .catch(error => console.error("Error:", error));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const newNote = {
            title: titleInput.value,
            content: contentInput.value
        };

        fetch("http://localhost:5000/add-notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNote)
        })
            .then(response => response.json())
            .then(() => {
                titleInput.value = "";
                contentInput.value = "";
                loadNotes();
            });
    });

    function deleteNote(id) {
        fetch(`http://localhost:5000/delete-notes/${id}`, { method: "DELETE" })
            .then(() => loadNotes());
    }

    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const updatedNote = {
            title: editTitleInput.value,
            content: editContentInput.value
        };

        fetch(`http://localhost:5000/update-notes/${editingNoteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedNote)
        })
            .then(() => {
                editPopup.style.display = "none"; // Sembunyikan popup
                loadNotes();
            });
    });

    cancelEditBtn.addEventListener("click", function () {
        editPopup.style.display = "none"; // Tutup popup tanpa menyimpan
    });

    loadNotes();
});
