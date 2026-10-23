import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "./FavoriteButton";

test("FavoriteButton offers to add a non-favorite to the favorites", () => {
  render(<FavoriteButton isFavorite={false} onToggleFavorite={vi.fn()} />);

  expect(
    screen.getByRole("button", { name: "Add to favorites" })
  ).toHaveAttribute("aria-pressed", "false");
});

test("FavoriteButton offers to remove a favorite from the favorites", () => {
  render(<FavoriteButton isFavorite={true} onToggleFavorite={vi.fn()} />);

  expect(
    screen.getByRole("button", { name: "Remove from favorites" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("FavoriteButton calls onToggleFavorite when clicked", async () => {
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
