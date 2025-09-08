'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Book = {
    id: string;
    name: string;
    publisher: string;
    page: number;
    image: string;
    language: string;
    status: string;
};

type DataContextType = {
    books: Book[];
    loading: boolean;
    addBook: (book: Omit<Book, "id">) => Promise<boolean>;
    updateBook: (id: string, book: Book) => Promise<boolean>;
    deleteBook: (id: string) => Promise<boolean>;
    refresh: () => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = "http://localhost:8000/books";

export function DataProvider({children}: { children: ReactNode }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all books
    const fetchBooks = async () => {
        setLoading(true);
        await fetch(API_URL)
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((err) => console.log("Failed to fetch books: ", err));
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks();
    }, []) 

    // add book
    const addBook = async (book: Omit<Book, "id">) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            
            if (!res.ok) return false;
            
            const newBook = await res.json();
            setBooks((prev) => [...prev, newBook]);  // state property function can take prev state automatically
            return true;
            
        } catch (error) {
            console.error("Error adding the book: ", error);
            return false;
        }
    };

    // Update books
    const updateBook = async (id: string, book: Book) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });

            if (!res.ok) return false;

            const updated = await res.json();
            setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
            return true;
        } catch (error) {
            console.error("Failed to update book: ", error);
            return false;
        }
    };
    
    // delete book
    const deleteBook = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (!res.ok) return false;

            setBooks((prev) => prev.filter((b) => b.id !== id));
            return true;
        } catch(error) {
            console.error("Failed to delete the book: ", error);
            return false;
        }
    };

    return (
        <DataContext.Provider
            value={{books, loading, addBook, updateBook, deleteBook, refresh: fetchBooks}}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
}
