import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotesPanel from ".";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("NotesPanel", () => {
  test("adds a note", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}"));
    render(<NotesPanel />);
    await user.type(screen.getByLabelText("Note"), "Loved it");
    await user.click(screen.getByRole("button", { name: "Add note" }));
    expect(await screen.findByText("Loved it")).toBeInTheDocument();
  });

  test("shows the delete button only to admins", () => {
    render(<NotesPanel />);
    expect(
      screen.queryByRole("button", { name: "Delete all notes" })
    ).not.toBeInTheDocument();

    localStorage.setItem("role", "admin");
    render(<NotesPanel />);
    expect(
      screen.getByRole("button", { name: "Delete all notes" })
    ).toBeInTheDocument();
  });

  test("shows HTML in a note as text and does not run it", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}"));
    const { container } = render(<NotesPanel />);
    await user.type(
      screen.getByLabelText("Note"),
      "<img src=x onerror=alert(1)>"
    );
    await user.click(screen.getByRole("button", { name: "Add note" }));
    expect(container.querySelector("img")).toBeNull();
    expect(
      await screen.findByText("<img src=x onerror=alert(1)>")
    ).toBeInTheDocument();
  });

  test("does not send an API key from the browser", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}"));
    render(<NotesPanel />);
    await user.type(screen.getByLabelText("Note"), "Loved it");
    await user.click(screen.getByRole("button", { name: "Add note" }));
    const [, options] = fetchSpy.mock.calls[0];
    expect(JSON.stringify(options?.headers)).not.toMatch(/key/i);
  });
});
