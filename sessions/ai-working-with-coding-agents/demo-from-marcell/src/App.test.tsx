import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("shows the number of books next to the title", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bookshelf (5)");
  });
});
