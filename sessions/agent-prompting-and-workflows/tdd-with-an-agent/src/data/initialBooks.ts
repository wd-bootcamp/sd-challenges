import type { Book } from "../types";

export const initialBooks: Book[] = [
  {
    id: "1",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    pages: 310,
    status: "read",
    rating: 5,
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    status: "reading",
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    pages: 352,
    status: "to-read",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    author: "Andy Weir",
    pages: 496,
    status: "read",
    rating: 4,
  },
  {
    id: "5",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    pages: 216,
    status: "reading",
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    status: "to-read",
  },
];
