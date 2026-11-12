import { useBooks } from "./useBooks";

// The books come from `localStorage` (useBooks). In part 2 of the task they will come from the API.
export default function App() {
  const { books } = useBooks();

  return (
    <main>
      <h1>Reading List</h1>
      <p>{books.length} books</p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
