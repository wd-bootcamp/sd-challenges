import type { Book } from "./books";
import { loadBooks, saveBooks } from "./storage";

const fallback: Book[] = [
  { id: "f", title: "Fallback", author: "A", year: 2000, rating: null, read: false },
];
const saved: Book[] = [
  { id: "1", title: "Dune", author: "Frank Herbert", year: 1965, rating: 5, read: true },
];

beforeEach(() => localStorage.clear());

describe("storage", () => {
  it("returns the fallback when nothing is stored", () => {
    expect(loadBooks(localStorage, fallback)).toEqual(fallback);
  });

  it("loads what was saved", () => {
    saveBooks(saved);
    expect(loadBooks(localStorage, fallback)).toEqual(saved);
  });

  it("returns the fallback for corrupt JSON", () => {
    localStorage.setItem("bookshelf.books", "{nope");
    expect(loadBooks(localStorage, fallback)).toEqual(fallback);
  });

  it("returns the fallback for data of the wrong shape", () => {
    localStorage.setItem("bookshelf.books", JSON.stringify([{ id: 1 }]));
    expect(loadBooks(localStorage, fallback)).toEqual(fallback);
  });
});
