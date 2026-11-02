import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from ".";

// The footer shows the current year. Without a fixed date, a snapshot of it
// would break on January 1st, although nothing is wrong with the component.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-06-15T12:00:00"));
});

afterEach(() => {
  vi.useRealTimers();
});

test("renders the current year", () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toHaveTextContent(
    "© 2026 Favorite Movies"
  );
});

test("matches the snapshot of the footer", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <footer>
        © 2026 Favorite Movies
      </footer>
    </DocumentFragment>
  `);
});
