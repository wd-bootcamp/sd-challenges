import { type FormEvent, useEffect, useState } from "react";

import * as api from "./api";

export default function App() {
  const [books, setBooks] = useState<api.Book[]>([]);
  const [message, setMessage] = useState("");

  async function loadBooks() {
    setBooks(await api.listBooks());
  }
  useEffect(() => {
    void loadBooks();
  }, []);

  // Run an action, show the error of the API, reload the list.
  async function run(action: () => Promise<unknown>) {
    try {
      await action();
      setMessage("");
    } catch (error) {
      setMessage((error as Error).message);
    }
    await loadBooks();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    void run(() =>
      api.addBook(String(data.get("title")), String(data.get("author")))
    );
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

      {message && <p role="alert">{message}</p>}

      <ul aria-label="Books">
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button
              aria-label={`Delete ${book.title}`}
              onClick={() => void run(() => api.deleteBook(book.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
