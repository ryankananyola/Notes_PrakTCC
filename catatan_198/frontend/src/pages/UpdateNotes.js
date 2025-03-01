import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getNoteById();
    }, []);

    const getNoteById = async () => {
        const res = await axios.get(`http://localhost:5000/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
    };

    const updateNote = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/update-notes/${id}`, { title, content });
        navigate("/");
    };

    return (
        <div>
            <h2>Edit Note</h2>
            <form onSubmit={updateNote}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditNote;