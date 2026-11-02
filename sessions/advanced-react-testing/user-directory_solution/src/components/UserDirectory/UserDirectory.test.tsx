import { afterEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDirectory from ".";

const users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Alan Turing", email: "alan@example.com" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com" },
];

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows a loading message first", () => {
  vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
  render(<UserDirectory />);
  expect(screen.getByText("Loading users …")).toBeInTheDocument();
});

test("renders the users after they have loaded", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(users));
  render(<UserDirectory />);
  expect(await screen.findByText(/Ada Lovelace/)).toBeInTheDocument();
  expect(screen.getByText(/Alan Turing/)).toBeInTheDocument();
  expect(screen.getByText(/Grace Hopper/)).toBeInTheDocument();
  expect(screen.queryByText("Loading users …")).not.toBeInTheDocument();
});

test("shows an error message when the request fails", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
  render(<UserDirectory />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Could not load the users."
  );
});

test("shows an error message when the server responds with an error", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(null, { status: 500 })
  );
  render(<UserDirectory />);
  expect(await screen.findByRole("alert")).toBeInTheDocument();
});

test("shows a hint when there are no users", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json([]));
  render(<UserDirectory />);
  expect(
    await screen.findByText("There are no users yet.")
  ).toBeInTheDocument();
});

test("filters the users by name, ignoring upper and lower case", async () => {
  const user = userEvent.setup();
  vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(users));
  render(<UserDirectory />);
  await user.type(await screen.findByLabelText("Search"), "AL");
  expect(screen.getByText(/Alan Turing/)).toBeInTheDocument();
  expect(screen.queryByText(/Ada Lovelace/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Grace Hopper/)).not.toBeInTheDocument();
});

test("shows a message when no user matches the search", async () => {
  const user = userEvent.setup();
  vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(users));
  render(<UserDirectory />);
  await user.type(await screen.findByLabelText("Search"), "xyz");
  expect(screen.getByText('No users match "xyz".')).toBeInTheDocument();
});

test("loads the users again when Retry is clicked", async () => {
  const user = userEvent.setup();
  // The second request stays open until we resolve it ourselves. Otherwise it could
  // finish before we get the chance to look at the loading state.
  let resolveSecondRequest: (response: Response) => void = () => {};
  const fetchSpy = vi
    .spyOn(globalThis, "fetch")
    .mockRejectedValueOnce(new Error("offline"))
    .mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSecondRequest = resolve;
      })
    );
  render(<UserDirectory />);

  await user.click(await screen.findByRole("button", { name: "Retry" }));

  expect(screen.getByText("Loading users …")).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  resolveSecondRequest(Response.json(users));
  expect(await screen.findByText(/Ada Lovelace/)).toBeInTheDocument();
  expect(fetchSpy).toHaveBeenCalledTimes(2);
});
