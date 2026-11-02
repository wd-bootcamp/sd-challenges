import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Movie from ".";

test("renders a movie", () => {
  render(<Movie id="1337" name="The Matrix Reloaded" />);
  const matrixHeading = screen.getByRole("heading", {
    name: "The Matrix Reloaded",
  });
  expect(matrixHeading).toBeInTheDocument();
});

test("renders a movie with a like button", () => {
  render(<Movie id="1337" name="The Matrix Reloaded" />);
  const matrixLikeButton = screen.getByRole("button", {
    name: "like The Matrix Reloaded",
  });
  expect(matrixLikeButton).toBeInTheDocument();
});

test("renders a movie with a unlike button", () => {
  render(<Movie id="1337" name="The Matrix Reloaded" isLiked={true} />);
  const matrixUnlikeButton = screen.getByRole("button", {
    name: "unlike The Matrix Reloaded",
  });
  expect(matrixUnlikeButton).toBeInTheDocument();
});

test("renders a movie with a delete button", () => {
  render(<Movie id="1337" name="The Matrix Reloaded" />);
  const matrixDeleteButton = screen.getByRole("button", {
    name: "delete The Matrix Reloaded",
  });
  expect(matrixDeleteButton).toBeInTheDocument();
});

test("calls the onToggleLike handler with the id when the like button is clicked", async () => {
  const user = userEvent.setup();
  const handleToggleLike = vi.fn();
  render(
    <Movie
      id="1337"
      name="The Matrix Reloaded"
      onToggleLike={handleToggleLike}
    />
  );
  const matrixLikeButton = screen.getByRole("button", {
    name: "like The Matrix Reloaded",
  });
  await user.click(matrixLikeButton);
  expect(handleToggleLike).toHaveBeenCalledWith("1337");
});

test("calls the onDeleteMovie handler with the id when the delete button is clicked", async () => {
  const user = userEvent.setup();
  const handleDeleteMovie = vi.fn();
  render(
    <Movie
      id="1337"
      name="The Matrix Reloaded"
      onDeleteMovie={handleDeleteMovie}
    />
  );
  const matrixDeleteButton = screen.getByRole("button", {
    name: "delete The Matrix Reloaded",
  });
  await user.click(matrixDeleteButton);
  expect(handleDeleteMovie).toHaveBeenCalledWith("1337");
});

test("matches the snapshot of a movie", () => {
  const { asFragment } = render(<Movie id="1337" name="The Matrix Reloaded" />);
  expect(asFragment()).toMatchSnapshot();
});

test("matches the snapshot of a liked movie", () => {
  const { asFragment } = render(
    <Movie id="1337" name="The Matrix Reloaded" isLiked={true} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders the like button as an inline snapshot", () => {
  render(<Movie id="1337" name="The Matrix Reloaded" />);
  const likeButton = screen.getByRole("button", {
    name: "like The Matrix Reloaded",
  });
  expect(likeButton).toMatchInlineSnapshot(`
    <button
      aria-label="like The Matrix Reloaded"
      class="round-button"
      title="like The Matrix Reloaded"
      type="button"
    >
      👎
    </button>
  `);
});

test("updates the like button when the isLiked prop changes", () => {
  const { rerender } = render(<Movie id="1337" name="The Matrix Reloaded" />);
  expect(
    screen.getByRole("button", { name: "like The Matrix Reloaded" })
  ).toBeInTheDocument();

  rerender(<Movie id="1337" name="The Matrix Reloaded" isLiked={true} />);
  expect(
    screen.getByRole("button", { name: "unlike The Matrix Reloaded" })
  ).toBeInTheDocument();
});
