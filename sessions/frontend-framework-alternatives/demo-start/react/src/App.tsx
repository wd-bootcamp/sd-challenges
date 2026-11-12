import { useMemo, useState } from "react";

import BookCard from "./components/BookCard";
import { filterBooks, STATUSES, STATUS_LABELS, updateBook } from "./core/books";
import { loadBooks } from "./core/storage";
import type { StatusFilter } from "./core/types";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(loadBooks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const visibleBooks = useMemo(
    () => filterBooks(books, { status, query }),
    [books, status, query]
  );

  function markDone(id: string) {
    setBooks((current) => updateBook(current, id, { status: "done" }));
  }

  return (
    <main>
      <h1>Reading List</h1>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title"
        aria-label="Search by title"
      />
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value as StatusFilter)}
        aria-label="Filter by status"
      >
        <option value="all">All</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <p>
        {visibleBooks.length} of {books.length} books
      </p>
      <div className="grid">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} onDone={markDone} />
        ))}
      </div>
    </main>
  );
}
