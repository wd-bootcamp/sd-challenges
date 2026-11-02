import { afterEach, expect, test, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Recommendations from ".";

const recommendations = [
  { id: "r1", name: "The Matrix" },
  { id: "r2", name: "Inception" },
];

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows a loading message while the recommendations are loading", () => {
  // a promise that never settles keeps the component in its loading state
  vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
  render(<Recommendations onAddMovie={() => {}} />);
  expect(screen.getByText("Loading recommendations …")).toBeInTheDocument();
});

test("loads the recommendations from the right url", async () => {
  const fetchSpy = vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(Response.json(recommendations));
  render(<Recommendations onAddMovie={() => {}} />);
  await screen.findByRole("heading", { name: "Recommended for you" });
  expect(fetchSpy).toHaveBeenCalledWith("/recommendations.json");
});

test("renders the recommendations after they have loaded", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    Response.json(recommendations)
  );
  render(<Recommendations onAddMovie={() => {}} />);

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading recommendations …")
  );

  expect(screen.getByText("The Matrix")).toBeInTheDocument();
  expect(screen.getByText("Inception")).toBeInTheDocument();
});

test("shows an error message when the request fails", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
  render(<Recommendations onAddMovie={() => {}} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("Could not load recommendations.");
});

test("shows an error message when the server responds with an error", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(null, { status: 500 })
  );
  render(<Recommendations onAddMovie={() => {}} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("Could not load recommendations.");
});

test("calls onAddMovie with the movie when its add button is clicked", async () => {
  const user = userEvent.setup();
  const handleAddMovie = vi.fn();
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    Response.json(recommendations)
  );
  render(<Recommendations onAddMovie={handleAddMovie} />);
  await user.click(
    await screen.findByRole("button", { name: "add Inception" })
  );
  expect(handleAddMovie).toHaveBeenCalledWith({
    name: "Inception",
    isLiked: false,
  });
});
