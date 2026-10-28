import BookCard from "./BookCard";
import EmptyShelf from "./EmptyShelf";
import type { Book, BookStatus } from "../types";

type BookListProps = {
  books: Book[];
  query: string;
  onChangeStatus: (id: string, status: BookStatus) => void;
};

export default function BookList({
  books,
  query,
  onChangeStatus,
}: BookListProps) {
  if (books.length === 0) {
    return <EmptyShelf query={query} />;
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
