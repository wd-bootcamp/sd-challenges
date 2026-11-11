export const STATUSES = ["want-to-read", "reading", "done"] as const;

export type Status = (typeof STATUSES)[number];

export type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  /** 1 to 5, `null` means "not rated" */
  rating: number | null;
  notes: string;
};

/** The editable fields of a book (what POST and PUT accept). */
export type BookInput = Omit<Book, "id">;
