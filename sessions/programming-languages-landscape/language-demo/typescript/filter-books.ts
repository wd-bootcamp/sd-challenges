type Status = "want-to-read" | "reading" | "done";

type Book = { title: string; author: string; status: Status };

const books: Book[] = [
  { title: "Dune", author: "Frank Herbert", status: "done" },
  { title: "The Hobbit", author: "J. R. R. Tolkien", status: "done" },
  { title: "Gone Girl", author: "Gillian Flynn", status: "want-to-read" },
  { title: "Neuromancer", author: "William Gibson", status: "reading" },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    status: "want-to-read",
  },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", status: "done" },
];

function filterBooks(
  books: Book[],
  status: Status | "all",
  query: string
): Book[] {
  const normalizedQuery = query.trim().toLowerCase();
  return books.filter(
    (book) =>
      (status === "all" || book.status === status) &&
      book.title.toLowerCase().includes(normalizedQuery)
  );
}

for (const book of filterBooks(books, "done", "the")) {
  console.log(`${book.title} (${book.status})`);
}
