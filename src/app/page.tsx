'use client'
import { useData } from "@/context/DataContext";
import AddBookForm from "./ui/AddBookForm";
import Library from "./ui/Library";

export default function Home() {
  const { books, loading, addBook, updateBook, deleteBook } = useData();

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Books</h1>
      <main>
        <AddBookForm/>
        <Library/>
      </main>
    </div>
  )
}
