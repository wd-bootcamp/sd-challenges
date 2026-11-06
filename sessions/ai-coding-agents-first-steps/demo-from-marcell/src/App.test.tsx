import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

beforeEach(() => localStorage.clear());

async function addBook() {
  await userEvent.type(screen.getByLabelText("Title"), "Emma");
  await userEvent.type(screen.getByLabelText("Author"), "Jane Austen");
  await userEvent.type(screen.getByLabelText("Year"), "1815");
  await userEvent.click(screen.getByRole("button", { name: "Add book" }));
}

describe("App", () => {
  it("shows the number of books next to the title", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bookshelf (5)");
  });

  it("adds a book to the list and the statistics", async () => {
    render(<App />);
    await addBook();
    expect(screen.getByRole("heading", { name: "Emma" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bookshelf (6)");
    expect(screen.getByText("Books: 6")).toBeInTheDocument();
  });

  it("keeps added books after a reload", async () => {
    const { unmount } = render(<App />);
    await addBook();
    unmount();

    render(<App />);
    expect(screen.getByRole("heading", { name: "Emma" })).toBeInTheDocument();
  });
});
