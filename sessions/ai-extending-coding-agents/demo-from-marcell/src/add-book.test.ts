import { addBook, validateNewBook, type Book } from "./books";
import { loadBooks, saveBooks } from "./storage";

const shelf: Book[] = [
  { id: "1", title: "Dune", author: "Frank Herbert", year: 1965, rating: 5, read: true },
];

describe("validateNewBook", () => {
  it("accepts a valid book", () => {
    expect(validateNewBook({ title: "Kindred", author: "Octavia E. Butler", year: "1979" }, 2026)).toEqual({});
  });

  it("requires title and author", () => {
    const errors = validateNewBook({ title: " ", author: "", year: "1979" }, 2026);
    expect(Object.keys(errors).sort()).toEqual(["author", "title"]);
  });

  it.each(["1449", "2027", "19.5", "abc", ""])("rejects the year %s", (year) => {
    expect(validateNewBook({ title: "A", author: "B", year }, 2026).year).toBeDefined();
  });
});

describe("addBook", () => {
  it("adds an unread, unrated book at the end and does not change the input", () => {
    const result = addBook(shelf, { title: " Kindred ", author: "Octavia E. Butler", year: "1979" }, "x");
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ id: "x", title: "Kindred", author: "Octavia E. Butler", year: 1979, rating: null, read: false });
    expect(shelf).toHaveLength(1);
  });
});

describe("storage", () => {
  beforeEach(() => localStorage.clear());

  it("returns the fallback when nothing is stored", () => {
    expect(loadBooks(shelf)).toBe(shelf);
  });

  it("loads what was saved", () => {
    saveBooks(shelf);
    expect(loadBooks([])).toEqual(shelf);
  });

  it("returns the fallback for invalid data", () => {
    localStorage.setItem("bookshelf.books", "not json");
    expect(loadBooks(shelf)).toBe(shelf);
  });
});
