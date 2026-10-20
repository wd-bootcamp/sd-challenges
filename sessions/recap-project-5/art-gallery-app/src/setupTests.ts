import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest has no globals by default, so clean up the rendered components ourselves.
afterEach(() => {
  cleanup();
});
