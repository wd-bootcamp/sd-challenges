import { STATUS_LABELS } from "@/labels";
import type { Book, Status } from "@/types";

/** Bonus story: a summary of the books that are shown. */
export function Stats({ books }: { books: Book[] }) {
  const counts: Record<Status, number> = {
    "want-to-read": 0,
    reading: 0,
    done: 0,
  };
  for (const book of books) counts[book.status] += 1;

  const rated = books.filter((book) => book.rating !== null);
  const average =
    rated.length > 0
      ? (
          rated.reduce((sum, book) => sum + (book.rating ?? 0), 0) /
          rated.length
        ).toFixed(1)
      : null;

  return (
    <p className="text-sm text-muted-foreground" data-testid="stats">
      {books.length} {books.length === 1 ? "book" : "books"}
      {" · "}
      {(Object.keys(counts) as Status[])
        .map(
          (status) => `${counts[status]} ${STATUS_LABELS[status].toLowerCase()}`
        )
        .join(" · ")}
      {" · "}
      {average ? `average rating ${average}` : "no ratings yet"}
    </p>
  );
}
