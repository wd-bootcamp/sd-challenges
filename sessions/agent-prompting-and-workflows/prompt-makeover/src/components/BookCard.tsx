import type { Book, BookStatus } from "../types";

type BookCardProps = {
  book: Book;
  onChangeStatus: (id: string, status: BookStatus) => void;
};

const nextStatus: Record<BookStatus, BookStatus> = {
  "to-read": "reading",
  reading: "read",
  read: "to-read",
};

const statusLabels: Record<BookStatus, string> = {
  "to-read": "To read",
  reading: "Reading",
  read: "Read",
};

export default function BookCard({ book, onChangeStatus }: BookCardProps) {
  return (
    <article className="book-card">
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <p className="book-card__pages">{book.pages} pages</p>
      {book.rating !== undefined && (
        <p className="book-card__rating" aria-label={`${book.rating} of 5 stars`}>
          {"★".repeat(book.rating)}
          {"☆".repeat(5 - book.rating)}
        </p>
      )}
      <span className={`status status--${book.status}`}>
        {statusLabels[book.status]}
      </span>
      <button
        type="button"
        onClick={() => onChangeStatus(book.id, nextStatus[book.status])}
      >
        Mark as {statusLabels[nextStatus[book.status]].toLowerCase()}
      </button>
    </article>
  );
}
