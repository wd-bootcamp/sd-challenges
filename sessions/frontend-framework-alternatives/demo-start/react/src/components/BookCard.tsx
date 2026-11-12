import { STATUS_LABELS } from "../core/books";
import type { Book } from "../core/types";
import "./BookCard.css";

type BookCardProps = {
  book: Book;
  onDone: (id: string) => void;
};

export default function BookCard({ book, onDone }: BookCardProps) {
  const stars =
    book.rating === null
      ? ""
      : "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <span className={`badge badge-${book.status}`}>
        {STATUS_LABELS[book.status]}
      </span>
      {book.rating !== null ? (
        <p>
          <span role="img" aria-label={`Rating: ${book.rating} of 5`}>
            {stars}
          </span>
        </p>
      ) : (
        <p>Not rated</p>
      )}
      {book.status !== "done" && (
        <button type="button" onClick={() => onDone(book.id)}>
          Mark as done
        </button>
      )}
    </article>
  );
}
