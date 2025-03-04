const formulir = document.querySelector("#noteForm");

formulir.addEventListener("submit", (e) => {
  e.preventDefault();

  const elemen_title = document.querySelector("#title");
  const elemen_content = document.querySelector("#content");

  const title = elemen_title.value.trim();
  const content = elemen_content.value.trim();

  if (!title || !content) {
    alert("Judul dan isi catatan tidak boleh kosong!");
    return;
  }

  const id = elemen_title.dataset.id || ""; 

  if (id === "") {
    axios
      .post("http://localhost:5000/add-notes", { title, content })
      .then(() => {
        elemen_title.value = "";
        elemen_content.value = "";
        getNotes();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`http://localhost:5000/update-notes/${id}`, { title, content })
      .then(() => {
        elemen_title.dataset.id = "";
        elemen_title.value = "";
        elemen_content.value = "";
        getNotes();
      })
      .catch((error) => console.log(error));
  }
});

async function getNotes() {
  try {
    const { data } = await axios.get("http://localhost:5000/notes");
    const table = document.querySelector("#notesContainer");
    let tampilan = "";
    let no = 1;

    data.forEach((note) => {
      tampilan += tampilkanNote(no, note);
      no++;
    });

    table.innerHTML = tampilan;
    hapusNote();
    editNote();
  } catch (error) {
    console.log(error.message);
  }
}

function tampilkanNote(no, note) {
  return `
    <tr>
      <td>${note.id}</td>
      <td>${note.title}</td>
      <td>${note.content}</td>
      <td>
        <button data-id="${note.id}" class='btn-edit btn-warning'>Edit</button>
        <button data-id="${note.id}" class='btn-hapus btn-danger'>Hapus</button>
      </td>
    </tr>
  `;
}

function hapusNote() {
  document.querySelectorAll(".btn-hapus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      axios
        .delete(`http://localhost:5000/delete-notes/${id}`)
        .then(() => getNotes())
        .catch((error) => console.log(error));
    });
  });
}

function editNote() {
  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const title = btn.closest("tr").children[1].textContent;
      const content = btn.closest("tr").children[2].textContent;

      document.querySelector("#editId").value = id;
      document.querySelector("#editTitle").value = title;
      document.querySelector("#editContent").value = content;

      document.querySelector("#editPopup").style.display = "block";
      document.querySelector("#popupOverlay").style.display = "block";
    });
  });
}

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.querySelector("#editId").value;
  const title = document.querySelector("#editTitle").value.trim();
  const content = document.querySelector("#editContent").value.trim();

  if (!title || !content) {
    alert("Judul dan isi catatan tidak boleh kosong!");
    return;
  }

  try {
    await axios.put(`http://localhost:5000/update-notes/${id}`, { title, content });

    document.querySelector("#editPopup").style.display = "none";
    document.querySelector("#popupOverlay").style.display = "none";

    getNotes();
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengupdate catatan.");
  }
});

const cancelEditBtn = document.querySelector("#cancelEdit");
cancelEditBtn.addEventListener("click", () => {
  document.querySelector("#editPopup").style.display = "none";
  document.querySelector("#popupOverlay").style.display = "none";
});

document.querySelector("#popupOverlay").addEventListener("click", () => {
  document.querySelector("#editPopup").style.display = "none";
  document.querySelector("#popupOverlay").style.display = "none";
});

getNotes();
