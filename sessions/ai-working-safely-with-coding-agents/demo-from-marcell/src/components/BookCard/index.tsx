import type { Book } from "../../books";

export type BookCardProps = {
  book: Book;
  onToggleRead: (id: string) => void;
};

export function BookCard({ book, onToggleRead }: BookCardProps) {
  return (
    <li className={book.read ? "book-card book-card--read" : "book-card"}>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-meta">
        {book.author} · {book.year}
      </p>
      <p className="book-rating">
        {book.rating === null ? "No rating yet" : "★".repeat(book.rating)}
      </p>
      <button type="button" onClick={() => onToggleRead(book.id)}>
        {book.read ? "Mark as unread" : "Mark as read"}
      </button>
    </li>
  );
}
