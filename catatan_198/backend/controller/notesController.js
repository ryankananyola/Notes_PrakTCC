import Note from "../models/notesModel.js";

// Get (Ambil Catatan)
async function getNote(req, res) {
    try {
        const result = await Note.findAll()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

// Create (Tambah Catatan)
async function createNote(req, res) {
    try {
        const inputResult = req.body
        const result = await Note.create(inputResult)
        return res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

// Update (Ubah Catatan)
async function updateNote(req, res) {
    try {
        const { id } = req.params
        const inputResult = req.body

        const note = await Note.findByPk(id)
        console.log(note)
        if(!note){
            return res.status(404).json({msg: "Note not found"})
        }

        await Note.update(inputResult,{
            where: { id: req.params.id},
        })
        return res.status(201).json({msg: "Note Updated"})
    } catch (error) {
        console.log(error.message)
    }
}

// Delete (Hapus Catatan)
async function deleteNote(req, res) {
    try {
      const { id } = req.params;
  
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ msg: "Note not found!" });
      }
  
      await Note.destroy({ where: { id } });
      return res.status(201).json({ msg: "Note Deleted" });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  export { getNote, createNote, updateNote, deleteNote };
