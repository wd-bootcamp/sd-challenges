import { render, screen } from "@testing-library/react";
import { StatsCard } from ".";
import { initialBooks } from "../../data/books";

describe("StatsCard", () => {
  it("shows the number of books", () => {
    render(<StatsCard books={initialBooks} />);
    expect(screen.getByText("Books: 5")).toBeInTheDocument();
  });
});

describe("StatsCard counts", () => {
  it("shows the number of read books and the average of rated books", () => {
    render(<StatsCard books={initialBooks} />);
    expect(screen.getByText("Read: 2")).toBeInTheDocument();
    expect(screen.getByText("Average rating: 4")).toBeInTheDocument();
  });
});
