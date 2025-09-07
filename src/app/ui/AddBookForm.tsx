'use client';

import { useData } from "@/context/DataContext";
import { useState } from "react";


export default function AddBookPage() {
    const { addBook, loading } = useData();

    const [form, setForm] = useState({
        name: "",
        publisher: "",
        page: 0,
        image: "",
        language: "",
        status: "Unread",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [id]: id === "page" ? Number(value) : value, // convert page value into number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevents page from realoading

        const success = await addBook(form);
        if (success) {
            alert("Book added successfully!");
            setForm({
                name: "",
                publisher: "",
                page: 0,
                image: "",
                language: "",
                status: "Unread",
            });
        } else {
            alert("Failed to add book!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Add Book:</legend>

                <label htmlFor="name">Name:</label><br></br>
                <input type="text" id="name" value={form.name} onChange={handleChange}></input><br></br>

                <label htmlFor="publisher">Publisher:</label><br></br>
                <input type="text" id="publisher" value={form.publisher} onChange={handleChange}></input><br></br>
                
                <label htmlFor="page">Page:</label><br></br>
                <input type="number" id="page" value={form.page} onChange={handleChange}></input><br></br>

                <label htmlFor="image">Image URL:</label><br></br>
                <input type="url" id="image" value={form.image} onChange={handleChange}></input><br></br>

                <label htmlFor="language">Language:</label><br></br>
                <input type="text" id="language" value={form.language} onChange={handleChange}></input><br></br>

                <label htmlFor="status">Status:</label>
                <select id="status" value={form.status} onChange={handleChange}>
                    <option value="Unread">Unread</option>
                    <option value="Reading">Reading</option>
                    <option value="Finished">Finished</option>
                </select><br></br>

                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Book"}
                </button>

            </fieldset>
        </form>
    )
}