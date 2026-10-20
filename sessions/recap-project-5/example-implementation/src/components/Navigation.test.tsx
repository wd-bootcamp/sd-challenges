import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("renders a link to every page", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Spotlight" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "/art-pieces"
    );
    expect(screen.getByRole("link", { name: "Favorites" })).toHaveAttribute(
      "href",
      "/favorites"
    );
  });
});
