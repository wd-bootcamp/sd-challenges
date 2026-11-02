import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { NewMovie } from "../../types";
import Movies from ".";

// Recommendations loads data with fetch. We replace it with a simple stand-in,
// so the Movies tests do not depend on the network.
vi.mock("../Recommendations", () => ({
  default: ({ onAddMovie }: { onAddMovie: (movie: NewMovie) => void }) => (
    <button
      type="button"
      onClick={() => onAddMovie({ name: "Inception", isLiked: false })}
    >
      add recommendation
    </button>
  ),
}));

const initialMovies = [
  {
    id: "0",
    name: "The Incredible Hulk",
    isLiked: false,
  },
  {
    id: "1",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "2",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

test("renders the initialMovies", () => {
  render(<Movies initialMovies={initialMovies} />);
  const hulkHeading = screen.getByRole("heading", {
    name: "The Incredible Hulk",
  });
  expect(hulkHeading).toBeInTheDocument();

  const spidermanHeading = screen.getByRole("heading", {
    name: "Spiderman 1-25",
  });
  expect(spidermanHeading).toBeInTheDocument();

  const lordOfTheRingsHeading = screen.getByRole("heading", {
    name: "Lord of the Rings",
  });
  expect(lordOfTheRingsHeading).toBeInTheDocument();
});

test("renders a new movie when the form is submitted with a new movie name", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  const input = screen.getByLabelText("Name");
  await user.type(input, "The Matrix");
  const button = screen.getByRole("button", { name: "Add" });
  await user.click(button);
  const matrixHeading = screen.getByRole("heading", { name: "The Matrix" });
  expect(matrixHeading).toBeInTheDocument();
});

test("deletes a movie when the delete button is clicked", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  const deleteButton = screen.getByRole("button", {
    name: "delete The Incredible Hulk",
  });
  await user.click(deleteButton);
  const hulkHeadline = screen.queryByRole("heading", {
    name: "The Incredible Hulk",
  });
  expect(hulkHeadline).not.toBeInTheDocument();
});

test("likes a movie when the like button is clicked", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  const likeButton = screen.getByRole("button", {
    name: "like The Incredible Hulk",
  });
  await user.click(likeButton);
  expect(likeButton).toHaveAccessibleName("unlike The Incredible Hulk");
});

test("unlikes a movie when the unlike button is clicked", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  const likeButton = screen.getByRole("button", {
    name: "unlike Lord of the Rings",
  });
  await user.click(likeButton);
  expect(likeButton).toHaveAccessibleName("like Lord of the Rings");
});

test("shows how many movies there are and how many are liked", () => {
  render(<Movies initialMovies={initialMovies} />);
  expect(screen.getByText("3 movies, 1 liked")).toBeInTheDocument();
});

test("updates the counts when a movie is liked", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  await user.click(
    screen.getByRole("button", { name: "like The Incredible Hulk" })
  );
  expect(screen.getByText("3 movies, 2 liked")).toBeInTheDocument();
});

test("updates the counts when a movie is deleted", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  await user.click(
    screen.getByRole("button", { name: "delete Lord of the Rings" })
  );
  expect(screen.getByText("2 movies, 0 liked")).toBeInTheDocument();
});

test("shows a hint when there are no movies", () => {
  render(<Movies initialMovies={[]} />);
  expect(screen.getByText("No movies yet. Add one below.")).toBeInTheDocument();
});

test("hides the hint after the first movie is added", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={[]} />);
  await user.type(screen.getByLabelText("Name"), "The Matrix");
  await user.click(screen.getByRole("button", { name: "Add" }));
  expect(
    screen.queryByText("No movies yet. Add one below.")
  ).not.toBeInTheDocument();
});

test("adds a recommended movie to the list", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  await user.click(screen.getByRole("button", { name: "add recommendation" }));
  expect(
    screen.getByRole("heading", { name: "Inception" })
  ).toBeInTheDocument();
});
