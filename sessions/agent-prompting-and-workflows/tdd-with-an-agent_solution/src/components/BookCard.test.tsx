import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookCard from "./BookCard";
import type { Book } from "../types";

const book: Book = {
  id: "1",
  title: "The Hobbit",
  author: "J. R. R. Tolkien",
  pages: 310,
  status: "to-read",
};

test("renders title, author and pages", () => {
  render(<BookCard book={book} onChangeStatus={vi.fn()} />);

  expect(screen.getByRole("heading", { name: "The Hobbit" })).toBeInTheDocument();
  expect(screen.getByText("J. R. R. Tolkien")).toBeInTheDocument();
  expect(screen.getByText("310 pages")).toBeInTheDocument();
});

test("shows the estimated reading time", () => {
  render(<BookCard book={book} onChangeStatus={vi.fn()} />);

  expect(screen.getByText("Reading time: about 7 h 45 min")).toBeInTheDocument();
});

test("moves a book from 'to read' to 'reading'", async () => {
  const user = userEvent.setup();
  const handleChangeStatus = vi.fn();
  render(<BookCard book={book} onChangeStatus={handleChangeStatus} />);

  await user.click(screen.getByRole("button", { name: "Mark as reading" }));

  expect(handleChangeStatus).toHaveBeenCalledWith("1", "reading");
});
