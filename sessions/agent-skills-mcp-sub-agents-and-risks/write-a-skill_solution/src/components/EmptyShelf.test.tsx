import { render, screen } from "@testing-library/react";
import EmptyShelf from "./EmptyShelf";

test("shows a general message without a search query", () => {
  render(<EmptyShelf query="" />);

  expect(screen.getByRole("status")).toHaveTextContent("No books found.");
});

test("mentions the search query", () => {
  render(<EmptyShelf query="  dune " />);

  expect(screen.getByRole("status")).toHaveTextContent(
    'No books match "dune". Try another title or author.'
  );
});
