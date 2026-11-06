import { averageRating, countRead, type Book } from "../../books";

export type StatsCardProps = {
  books: Book[];
};

export function StatsCard({ books }: StatsCardProps) {
  const average = averageRating(books);
  const read = countRead(books);

  return (
    <section className="stats-card" aria-label="Statistics">
      <p>Books: {books.length}</p>
      <p>Read: {read}</p>
      <p>Average rating: {average === null ? "–" : average}</p>
    </section>
  );
}
