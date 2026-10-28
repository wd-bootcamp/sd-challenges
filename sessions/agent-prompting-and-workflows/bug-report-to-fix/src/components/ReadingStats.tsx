import { getReadingStats } from "../lib/stats";
import type { Book } from "../types";

type ReadingStatsProps = {
  books: Book[];
};

export default function ReadingStats({ books }: ReadingStatsProps) {
  const stats = getReadingStats(books);

  return (
    <section className="stats" aria-label="Reading stats">
      <p>
        <strong>{stats.read}</strong> of {stats.total} books read (
        {stats.percentRead}%)
      </p>
      <p>
        <strong>{stats.pagesRead}</strong> pages read
      </p>
    </section>
  );
}
