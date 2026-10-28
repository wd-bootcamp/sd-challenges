export type BookStatus = "to-read" | "reading" | "read";

export type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  status: BookStatus;
  rating?: number;
};

export type StatusFilter = BookStatus | "all";

export type SortOption = "added" | "title" | "author" | "rating";
