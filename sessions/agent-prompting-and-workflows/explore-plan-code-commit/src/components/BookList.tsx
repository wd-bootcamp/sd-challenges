import BookCard from "./BookCard";
import type { Book, BookStatus } from "../types";

type BookListProps = {
  books: Book[];
  onChangeStatus: (id: string, status: BookStatus) => void;
};

export default function BookList({ books, onChangeStatus }: BookListProps) {
  if (books.length === 0) {
    return <p className="empty">No books found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} onChangeStatus={onChangeStatus} />
        </li>
      ))}
    </ul>
  );
}
