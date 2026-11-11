import type { Book } from "../../books";

export type BookCardProps = {
  book: Book;
  onToggleRead: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
};

export function BookCard({ book, onToggleRead, onRate }: BookCardProps) {
  return (
    <li className={book.read ? "book-card book-card--read" : "book-card"}>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-meta">
        {book.author} · {book.year}
      </p>
      <p className="book-rating">
        {book.rating === null ? "No rating yet" : "★".repeat(book.rating)}
      </p>
      {onRate && (
        <div className="book-stars" role="group" aria-label={`Rate ${book.title}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              aria-pressed={book.rating !== null && star <= book.rating}
              onClick={() => onRate(book.id, star)}
            >
              {book.rating !== null && star <= book.rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      )}
      <button type="button" onClick={() => onToggleRead(book.id)}>
        {book.read ? "Mark as unread" : "Mark as read"}
      </button>
    </li>
  );
}
