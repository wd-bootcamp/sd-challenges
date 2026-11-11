import { type FormEvent, useState } from "react";

import { STATUS_LABELS } from "./books";
import type { Status } from "./types";
import { useBooksApi } from "./useBooksApi";

export default function App() {
  const [status, setStatus] = useState<Status | "all">("all");
  const { books, loading, error, addBook, markDone, deleteBook } = useBooksApi(
    status === "all" ? undefined : status
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await addBook({
      title: String(data.get("title")),
      author: String(data.get("author")),
    });
    form.reset();
  }

  return (
    <main>
      <h1>Reading List</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" aria-label="Title" />
        <input name="author" placeholder="Author" aria-label="Author" />
        <button>Add book</button>
      </form>

      <label>
        Status{" "}
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as Status | "all")}
        >
          <option value="all">All</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {error && <p role="alert">{error}</p>}
      {loading && <p>Loading...</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({STATUS_LABELS[book.status]}){" "}
            {book.status !== "done" && (
              <button onClick={() => markDone(book)}>Mark as done</button>
            )}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
