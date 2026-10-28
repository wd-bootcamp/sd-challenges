type EmptyShelfProps = {
  query: string;
};

export default function EmptyShelf({ query }: EmptyShelfProps) {
  const trimmedQuery = query.trim();

  return (
    <p className="empty" role="status">
      {trimmedQuery === ""
        ? "No books found."
        : `No books match "${trimmedQuery}". Try another title or author.`}
    </p>
  );
}
