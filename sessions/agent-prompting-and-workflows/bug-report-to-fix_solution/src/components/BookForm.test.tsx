import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookForm from "./BookForm";

async function fillAndSubmit(title: string, author: string, pages: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Title"), title);
  await user.type(screen.getByLabelText("Author"), author);
  await user.type(screen.getByLabelText("Pages"), pages);
  await user.click(screen.getByRole("button", { name: "Add book" }));
}

test("adds a valid book", async () => {
  const handleAddBook = vi.fn();
  render(<BookForm onAddBook={handleAddBook} />);

  await fillAndSubmit("Dune", "Frank Herbert", "412");

  expect(handleAddBook).toHaveBeenCalledWith("Dune", "Frank Herbert", 412);
});

// Regression tests for issue #12
test("removes spaces around the title and the author", async () => {
  const handleAddBook = vi.fn();
  render(<BookForm onAddBook={handleAddBook} />);

  await fillAndSubmit("  Dune  ", " Frank Herbert ", "412");

  expect(handleAddBook).toHaveBeenCalledWith("Dune", "Frank Herbert", 412);
});

test("does not add a book with a blank title and shows an error", async () => {
  const handleAddBook = vi.fn();
  render(<BookForm onAddBook={handleAddBook} />);

  await fillAndSubmit("   ", "Frank Herbert", "412");

  expect(handleAddBook).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Title and author can't be empty."
  );
});

test("does not add a book with a blank author", async () => {
  const handleAddBook = vi.fn();
  render(<BookForm onAddBook={handleAddBook} />);

  await fillAndSubmit("Dune", "   ", "412");

  expect(handleAddBook).not.toHaveBeenCalled();
});
