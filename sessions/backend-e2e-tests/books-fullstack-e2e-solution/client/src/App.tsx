import { type FormEvent, useEffect, useState } from "react";

import * as api from "./api";

export default function App() {
  const [user, setUser] = useState<api.User | null>(null);
  const [books, setBooks] = useState<api.Book[]>([]);
  const [message, setMessage] = useState("");

  async function loadUser() {
    setUser(await api.getMe().catch(() => null)); // 401 means: not logged in
  }
  async function loadBooks() {
    setBooks(await api.listBooks());
  }
  useEffect(() => {
    void loadUser();
    void loadBooks();
  }, []);

  // Run an action, show the error of the API (a 401 when not logged in), reload the list.
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
    void run(() => api.addBook(String(data.get("title")), String(data.get("author"))));
    form.reset();
  }

  return (
    <main>
      <h1>Reading List</h1>

      {user ? (
        <p>
          <span>Logged in as {user.name ?? user.login}</span>{" "}
          <button onClick={() => void api.logout().then(loadUser)}>Log out</button>
        </p>
      ) : (
        <p>
          <span>Not logged in</span>{" "}
          {/* A plain link: the login is a navigation of the browser, not a fetch. */}
          <a href={`${api.API_URL}/auth/github`}>Log in with GitHub</a>
        </p>
      )}

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
            <button aria-label={`Delete ${book.title}`} onClick={() => void run(() => api.deleteBook(book.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
