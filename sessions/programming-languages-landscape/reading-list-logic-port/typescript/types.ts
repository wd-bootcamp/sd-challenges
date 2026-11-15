export type Status = "want-to-read" | "reading" | "done";

export type StatusFilter = Status | "all";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  /** 1 to 5 stars, `null` means "not rated" */
  rating: number | null;
  notes: string;
};
