"use client";

import { useData } from "@/context/DataContext";
import { truncate, write } from "fs";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function AddBookPage() {
  const { addBook, loading } = useData();
  const [zeroCheck, setZeroCheck] = useState<boolean | null>(null);
  const [nameCheck, setNameCheck] = useState<boolean | null>(null);
  const [writerCheck, setWriterCheck] = useState<boolean | null>(null);

  const [form, setForm] = useState({
    name: "",
    writer: "",
    publisher: "",
    pageTotal: "0",
    pageRead: "0",
    image: "",
    language: "",
    status: "Unread",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "pageTotal" && value != "" && !Number(value)) {
      setForm({ ...form, pageTotal: "0" });
      return;
    } else if (id === "pageRead" && value != "" && !Number(value)) {
      setForm({ ...form, pageRead: "0" });
      return;
    }

    // Check book name
    if (id === "name" && value === "") setNameCheck(false);
    else if (id === "name" && value !== "") setNameCheck(true);

    // Check writer
    if (id === "writer" && value === "") setWriterCheck(false);
    else if (id === "writer" && value !== "") setWriterCheck(true);

    // Check total page amount
    if (id === "pageTotal" && Number(value) != 0) setZeroCheck(true);
    else if (id === "pageTotal" && Number(value) == 0) setZeroCheck(false);

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page from realoading
    let control = true;

    if (Number(form.pageTotal) == 0) {
      setZeroCheck(false);
      alert("Total page cannot be zero!");
      control = false;
    }

    if (form.name === "") {
      setNameCheck(false);
      alert("Book has to have a name!");
      control = false;
    }

    if (form.writer === "") {
      setWriterCheck(false);
      alert("Book has to have a writer!");
      control = false;
    }

    if (!control) return;

    const success = await addBook({
      ...form,
      pageTotal: form.pageTotal === "" ? 0 : Number(form.pageTotal),
      pageRead: form.pageRead === "" ? 0 : Number(form.pageRead),
    });
    if (success) {
      alert("Book added successfully!");
      setForm({
        name: "",
        writer: "",
        publisher: "",
        pageTotal: "0",
        pageRead: "0",
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
        <Label for="name" sm={1}>
          Name
        </Label>
        <Col sm={5}>
          <Input
            valid={nameCheck === true}
            invalid={nameCheck === false}
            id="name"
            name="name"
            placeholder="Name of the book"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          <FormFeedback>Book name cannot be empty!</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="writer" sm={1}>
          Writer
        </Label>
        <Col sm={5}>
          <Input
            valid={writerCheck === true}
            invalid={writerCheck === false}
            id="writer"
            name="writer"
            placeholder="Writer of the book"
            type="text"
            value={form.writer}
            onChange={handleChange}
          />
          <FormFeedback>Book writer cannot be empty!</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="publisher" sm={1}>
          Publisher
        </Label>
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
        <Label for="pageTotal" sm={1}>
          Total Page
        </Label>
        <Col sm={5}>
          <Input
            valid={zeroCheck === true}
            invalid={zeroCheck === false}
            id="pageTotal"
            name="pageTotal"
            type="text"
            value={form.pageTotal}
            onChange={handleChange}
          />
          <FormFeedback>Total page number cannot be 0!</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="pageRead" sm={1}>
          Total Read
        </Label>
        <Col sm={5}>
          <Input
            id="pageRead"
            name="pageRead"
            type="text"
            value={form.pageRead}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="image" sm={1}>
          URL
        </Label>
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
        <Label for="language" sm={1}>
          Language
        </Label>
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
  );
}
