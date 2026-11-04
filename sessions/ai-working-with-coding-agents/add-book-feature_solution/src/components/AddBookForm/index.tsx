import { useState } from "react";
import { validateNewBook } from "../../books";
import type { NewBook } from "../../books";
import type { Book, Genre } from "../../types";

type AddBookFormProps = {
  books: Book[];
  onAddBook: (book: NewBook) => void;
};

export default function AddBookForm({ books, onAddBook }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState<Genre>("fantasy");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateNewBook(books, { title, author, genre, rating });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAddBook(result.book);
    setTitle("");
    setAuthor("");
    setGenre("fantasy");
    setRating(0);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="add-book">
      <h2>Add a book</h2>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Author
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        Book genre
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value as Genre)}
        >
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="mystery">Mystery</option>
          <option value="non-fiction">Non-fiction</option>
        </select>
      </label>
      <label>
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>Not rated</option>
          {[1, 2, 3, 4, 5].map((stars) => (
            <option key={stars} value={stars}>
              {stars}
            </option>
          ))}
        </select>
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add book</button>
    </form>
  );
}
