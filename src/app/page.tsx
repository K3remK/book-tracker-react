'use client'
import { useData } from "@/context/DataContext";
import AddBookForm from "./ui/AddBookForm";

export default function Home() {
  const { books, loading, addBook, updateBook, deleteBook } = useData();

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Books</h1>
      {/* <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.name} - {b.publisher} - {b.page} - {b.status}
            {"  "}
            <button onClick={() => deleteBook(b.id)}>Delete</button>
            {"  "}
            <button onClick={() => updateBook(b.id, { ...b, status: "Done" })}>Update</button>
          </li>
        ))}
      </ul> */}
      <AddBookForm/>
    </div>
  )
}
