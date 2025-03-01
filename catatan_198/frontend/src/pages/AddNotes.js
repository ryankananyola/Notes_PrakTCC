import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
    const titleRef = useRef(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        titleRef.current.focus(); 
    }, []);

    const saveNote = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/add-notes", { title, content });
        navigate("/");
    };

    return (
        <div>
            <h2>Add Note</h2>
            <form onSubmit={saveNote}>
                <input 
                    ref={titleRef} // Tambahkan ref ke input
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddNote;
