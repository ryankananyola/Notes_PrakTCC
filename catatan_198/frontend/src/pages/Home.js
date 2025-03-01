import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await axios.get("http://localhost:5000/notes");
        setNotes(res.data || []);
    };

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/delete-notes/${id}`);
        fetchNotes();
    };

    return (
        <div>
            <h2>Notes List</h2>
            <Link to="/add-notes">Add Notes</Link>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <Link to={`/update-notes/${note.id}`}>Edit</Link>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;