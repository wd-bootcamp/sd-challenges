import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import ReadingStats from "./components/ReadingStats";
import SearchBar from "./components/SearchBar";
import { initialBooks } from "./data/initialBooks";
import { filterBooks } from "./lib/filterBooks";
import type { Book, BookStatus, StatusFilter } from "./types";

export default function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  function handleAddBook(title: string, author: string, pages: number): void {
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      pages,
      status: "to-read",
    };
    setBooks([newBook, ...books]);
  }

  function handleChangeStatus(id: string, newStatus: BookStatus): void {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    );
  }

  const visibleBooks = filterBooks(books, query, status);

  return (
    <main className="app">
      <h1>📚 Bookshelf</h1>
      <ReadingStats books={books} />
      <BookForm onAddBook={handleAddBook} />
      <SearchBar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />
      <BookList
        books={visibleBooks}
        query={query}
        onChangeStatus={handleChangeStatus}
      />
    </main>
  );
}
