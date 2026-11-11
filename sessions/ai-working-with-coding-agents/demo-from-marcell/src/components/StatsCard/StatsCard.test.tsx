import { render, screen } from "@testing-library/react";
import { StatsCard } from ".";
import { initialBooks } from "../../data/books";

describe("StatsCard", () => {
  it("shows the number of books", () => {
    render(<StatsCard books={initialBooks} />);
    expect(screen.getByText("Books: 5")).toBeInTheDocument();
  });
});
