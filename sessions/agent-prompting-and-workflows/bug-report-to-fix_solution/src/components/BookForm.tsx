import { useState } from "react";
import type { SubmitEvent } from "react";

type BookFormProps = {
  onAddBook: (title: string, author: string, pages: number) => void;
};

export default function BookForm({ onAddBook }: BookFormProps) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title")).trim();
    const author = String(formData.get("author")).trim();

    if (title === "" || author === "") {
      setError("Title and author can't be empty.");
      return;
    }

    setError(null);
    onAddBook(title, author, Number(formData.get("pages")));
    form.reset();
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} aria-label="Add a book">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required />

      <label htmlFor="author">Author</label>
      <input id="author" name="author" required />

      <label htmlFor="pages">Pages</label>
      <input id="pages" name="pages" type="number" min="1" required />

      <button type="submit">Add book</button>

      {error && (
        <p className="book-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
