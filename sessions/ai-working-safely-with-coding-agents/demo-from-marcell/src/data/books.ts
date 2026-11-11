import type { Book } from "../books";

export const initialBooks: Book[] = [
  { id: "1", title: "Dune", author: "Frank Herbert", year: 1965, rating: 5, read: true },
  { id: "2", title: "The Hobbit", author: "J. R. R. Tolkien", year: 1937, rating: 4, read: true },
  { id: "3", title: "Neuromancer", author: "William Gibson", year: 1984, rating: null, read: false },
  { id: "4", title: "Project Hail Mary", author: "Andy Weir", year: 2021, rating: null, read: false },
  { id: "5", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: 1969, rating: 3, read: false },
];
