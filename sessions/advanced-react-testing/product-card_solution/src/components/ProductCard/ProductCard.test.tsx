import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from ".";

// The "New" badge depends on today's date, so we fix the date for every test.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-03-15T12:00:00"));
});

afterEach(() => {
  vi.useRealTimers();
});

test("matches the snapshot of a regular product", () => {
  const { asFragment } = render(
    <ProductCard name="Coffee Grinder" price={80} addedAt="2026-01-10" />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("shows the New badge for a product that was added two days ago", () => {
  render(<ProductCard name="Coffee Grinder" price={80} addedAt="2026-03-13" />);
  expect(screen.getByText("New")).toBeInTheDocument();
});

test("does not show the New badge for a product that was added a month ago", () => {
  render(<ProductCard name="Coffee Grinder" price={80} addedAt="2026-02-13" />);
  expect(screen.queryByText("New")).not.toBeInTheDocument();
});

test("shows the discounted price", () => {
  render(
    <ProductCard
      name="Espresso Machine"
      price={80}
      discount={25}
      addedAt="2026-01-10"
    />
  );
  expect(screen.getByText("60.00 €")).toBeInTheDocument();
  expect(screen.getByText("Sale -25%")).toBeInTheDocument();
});

test("matches the inline snapshot of a product on sale", () => {
  const { asFragment } = render(
    <ProductCard
      name="Espresso Machine"
      price={80}
      discount={25}
      addedAt="2026-01-10"
    />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <article
        class="card"
      >
        <h2>
          Espresso Machine
        </h2>
        <span
          class="badge"
        >
          Sale -25%
        </span>
        <p>
          <s>
            80.00 €
          </s>
           
          <strong>
            60.00 €
          </strong>
        </p>
      </article>
    </DocumentFragment>
  `);
});
