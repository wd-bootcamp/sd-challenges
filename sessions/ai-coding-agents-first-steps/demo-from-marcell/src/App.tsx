import { useEffect, useState } from "react";
import { searchBooks, sortByYear, toggleRead, type Book } from "./books";
import { loadBooks, saveBooks } from "./storage";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import { SearchBar } from "./components/SearchBar";
import { StatsCard } from "./components/StatsCard";

export function App() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());
  const [query, setQuery] = useState("");
  const [sorted, setSorted] = useState(false);

  useEffect(() => saveBooks(books), [books]);

  const found = searchBooks(books, query);
  const visible = sorted ? sortByYear(found) : found;

  return (
    <main className="app">
      <h1>
        Bookshelf <span className="book-count">({books.length})</span>
      </h1>
      <StatsCard books={books} />
      <BookForm onAdd={(book) => setBooks((current) => [...current, book])} />
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <label>
          <input
            type="checkbox"
            checked={sorted}
            onChange={(event) => setSorted(event.target.checked)}
          />
          Sort by year
        </label>
      </div>
      {visible.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="book-list">
          {visible.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onToggleRead={(id) => setBooks((current) => toggleRead(current, id))}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
