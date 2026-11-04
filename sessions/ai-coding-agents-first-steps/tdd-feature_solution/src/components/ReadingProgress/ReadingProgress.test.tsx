import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { initialBooks } from "../../data";
import ReadingProgress from ".";

describe("ReadingProgress", () => {
  test("says that there are no books", () => {
    render(<ReadingProgress books={[]} />);
    expect(screen.getByText("No books yet.")).toBeInTheDocument();
  });

  test("shows how many books are read", () => {
    render(<ReadingProgress books={initialBooks} />);
    expect(screen.getByText("2 of 5 books read (40 %)")).toBeInTheDocument();
  });

  test("uses the singular for exactly one book", () => {
    render(<ReadingProgress books={[initialBooks[0]]} />);
    expect(screen.getByText("1 of 1 book read (100 %)")).toBeInTheDocument();
  });

  test("rounds the percent value", () => {
    render(<ReadingProgress books={initialBooks.slice(0, 3)} />);
    expect(screen.getByText("2 of 3 books read (67 %)")).toBeInTheDocument();
  });
});
