import { beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Movie, { type MovieProps } from "../Movie";
import Movies from ".";

// In this file both children are replaced, so we only test what Movies itself does:
// which props it passes down and how it reacts to the handlers it handed over.
vi.mock("../Movie", () => ({
  default: vi.fn(({ id, name, onDeleteMovie }: MovieProps) => (
    <button type="button" onClick={() => onDeleteMovie?.(id)}>
      {name}
    </button>
  )),
}));
vi.mock("../Recommendations", () => ({ default: () => null }));

const initialMovies = [
  { id: "0", name: "The Incredible Hulk", isLiked: false },
  { id: "1", name: "Lord of the Rings", isLiked: true },
];

beforeEach(() => {
  vi.mocked(Movie).mockClear();
});

test("renders one Movie per movie", () => {
  render(<Movies initialMovies={initialMovies} />);
  expect(Movie).toHaveBeenCalledTimes(2);
});

test("passes id, name and isLiked to each Movie", () => {
  render(<Movies initialMovies={initialMovies} />);
  const props = vi.mocked(Movie).mock.calls.map(([props]) => props);
  expect(props[1]).toMatchObject({
    id: "1",
    name: "Lord of the Rings",
    isLiked: true,
  });
});

test("removes a movie when its Movie calls onDeleteMovie", async () => {
  const user = userEvent.setup();
  render(<Movies initialMovies={initialMovies} />);
  await user.click(screen.getByRole("button", { name: "The Incredible Hulk" }));
  expect(
    screen.queryByRole("button", { name: "The Incredible Hulk" })
  ).not.toBeInTheDocument();
});
