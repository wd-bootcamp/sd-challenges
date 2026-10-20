import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FavoriteButton from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("offers to add a non-favorite to the favorites", () => {
    render(<FavoriteButton isFavorite={false} onToggleFavorite={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Add to favorites" })
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("offers to remove a favorite from the favorites", () => {
    render(<FavoriteButton isFavorite={true} onToggleFavorite={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Remove from favorites" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggleFavorite when clicked", async () => {
    const user = userEvent.setup();
    const handleToggleFavorite = vi.fn();
    render(
      <FavoriteButton
        isFavorite={false}
        onToggleFavorite={handleToggleFavorite}
      />
    );

    await user.click(screen.getByRole("button"));

    expect(handleToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
