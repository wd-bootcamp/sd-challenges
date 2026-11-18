import type { Request, Response } from "express";
import { describe, expect, test, vi } from "vitest";

import { BookModel } from "../models/Book";
import { errorHandler } from "./errors";

// Optional challenge 2: call the error handler with a stub response. No server, no database.
function stubResponse() {
  const response = { status: vi.fn(), json: vi.fn() };
  response.status.mockReturnValue(response); // status() returns the object, so .status(400).json(...) works
  return response;
}

function handle(error: unknown) {
  const response = stubResponse();
  errorHandler(error, {} as Request, response as unknown as Response, vi.fn());
  return response;
}

describe("errorHandler", () => {
  test("a mongoose ValidationError becomes a 400 with the messages", async () => {
    // validate(), not validateSync(): validateSync is deprecated in mongoose 9.
    const error = await new BookModel({ title: "", author: "" })
      .validate()
      .catch((e) => e);
    const response = handle(error);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: "title is required, author is required",
    });
  });

  test("an unknown error becomes a 500 without details", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const response = handle(new Error("secret detail"));
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
    consoleError.mockRestore();
  });
});
