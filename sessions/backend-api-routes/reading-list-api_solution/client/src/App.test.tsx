import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import App from "./App";
import * as api from "./api";
import type { Book } from "./types";

vi.mock("./api");

const dune: Book = {
  id: "1",
  title: "Dune",
  author: "Frank Herbert",
  status: "reading",
  rating: null,
  notes: "",
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(api.listBooks).mockResolvedValue([dune]);
});

test("loads the books from the API and shows them", async () => {
  render(<App />);
  expect(await screen.findByText(/Dune by Frank Herbert/)).toBeInTheDocument();
  expect(api.listBooks).toHaveBeenCalledWith({ status: undefined });
});

test("shows the error message when the request fails", async () => {
  vi.mocked(api.listBooks).mockRejectedValue(
    new Error("Cannot reach the API. Is the server running?")
  );
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Cannot reach the API"
  );
});

test("deletes a book with DELETE and loads the list again", async () => {
  vi.mocked(api.deleteBook).mockResolvedValue();
  render(<App />);
  await userEvent.click(await screen.findByRole("button", { name: "Delete" }));
  expect(api.deleteBook).toHaveBeenCalledWith("1");
  expect(api.listBooks).toHaveBeenCalledTimes(2);
});

test("adds a book with POST", async () => {
  vi.mocked(api.createBook).mockResolvedValue(dune);
  render(<App />);
  await userEvent.type(await screen.findByLabelText("Title"), "Neuromancer");
  await userEvent.type(screen.getByLabelText("Author"), "William Gibson");
  await userEvent.click(screen.getByRole("button", { name: "Add book" }));
  expect(api.createBook).toHaveBeenCalledWith({
    title: "Neuromancer",
    author: "William Gibson",
  });
});

test("the status filter is sent to the API", async () => {
  render(<App />);
  await userEvent.selectOptions(await screen.findByLabelText("Status"), "done");
  expect(api.listBooks).toHaveBeenLastCalledWith({ status: "done" });
});
