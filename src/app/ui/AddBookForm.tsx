'use client';

import { useData } from "@/context/DataContext";
import { Butterfly_Kids } from "next/font/google";
import { styleText } from "node:util";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";


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
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="name" sm={1}>Name</Label>
                <Col sm={5}>
                    <Input 
                    id="name" 
                    name="name" 
                    placeholder="Name of the book" 
                    type="text" 
                    value={form.name} 
                    onChange={handleChange}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="publisher" sm={1}>Publisher</Label>
                <Col sm={5}>
                    <Input 
                    id="publisher" 
                    name="publisher" 
                    placeholder="Publisher of the book" 
                    type="text" 
                    value={form.publisher}
                    onChange={handleChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="page" sm={1}>Page</Label>
                <Col sm={5}>
                    <Input 
                    id="page" 
                    name="page" 
                    type="number" 
                    value={form.page}
                    onChange={handleChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="image" sm={1}>URL</Label>
                <Col sm={5}>
                    <Input 
                    id="image" 
                    name="image" 
                    placeholder="https:/example.com" 
                    type="text" 
                    value={form.image}
                    onChange={handleChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="language" sm={1}>Language</Label>
                <Col sm={5}>
                    <Input 
                    id="language" 
                    name="language" 
                    placeholder="Book's language" 
                    type="text"
                    value={form.language}
                    onChange={handleChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="status" sm={1}>
                    Status
                </Label>
                <Col sm={3}>
                    <Input
                        id="status"
                        name="status"
                        type="select"
                        value={form.status}
                        onChange={handleChange}
                        >
                        <option value="Unread">Unread</option>
                        <option value="Reading">Reading</option>
                        <option value="Finished">Finished</option>
                    </Input>
                </Col>
                <Col sm={2}>
                    <Button block>Add</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}