export const STATUSES = ["want-to-read", "reading", "done"] as const;

export type Status = (typeof STATUSES)[number];

export type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  /** 1 to 5 stars, `null` means "not rated" */
  rating: number | null;
  notes: string;
};

/** The data you need to create or replace a book. The `id` is created by the server. */
export type NewBook = Omit<Book, "id">;
