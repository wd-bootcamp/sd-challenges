import { useEffect, useState } from "react";
import { addBook, filterUnread, rateBook, searchBooks, sortByYear, toggleRead, type Book } from "./books";
import { loadBooks, saveBooks } from "./storage";
import { initialBooks } from "./data/books";
import { AddBookForm } from "./components/AddBookForm";
import { BookCard } from "./components/BookCard";
import { SearchBar } from "./components/SearchBar";
import { StatsCard } from "./components/StatsCard";

export function App() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks(initialBooks));
  const [query, setQuery] = useState("");
  const [sorted, setSorted] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(false);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const searched = searchBooks(books, query);
  const found = onlyUnread ? filterUnread(searched) : searched;
  const visible = sorted ? sortByYear(found) : found;

  return (
    <main className="app">
      <h1>Bookshelf</h1>
      <StatsCard books={books} />
      <AddBookForm onAdd={(input) => setBooks((current) => addBook(current, input))} />
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
        <label>
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(event) => setOnlyUnread(event.target.checked)}
          />
          Only unread
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
              onRate={(id, rating) => setBooks((current) => rateBook(current, id, rating))}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
