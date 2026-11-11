import { STATUSES, type NewBook, type Status } from "./types";

export type ParseResult =
  { ok: true; value: NewBook } | { ok: false; error: string };

function isStatus(value: unknown): value is Status {
  return STATUSES.includes(value as Status);
}

/** Checks the body of POST and PUT and fills in the defaults. */
export function parseBookInput(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "Body must be a JSON object" };
  }
  const input = body as Record<string, unknown>;

  if (typeof input.title !== "string" || input.title.trim() === "") {
    return { ok: false, error: "title is required" };
  }
  if (typeof input.author !== "string" || input.author.trim() === "") {
    return { ok: false, error: "author is required" };
  }

  const status = input.status ?? "want-to-read";
  if (!isStatus(status)) {
    return {
      ok: false,
      error: `status must be one of: ${STATUSES.join(", ")}`,
    };
  }

  const rating = input.rating ?? null;
  if (
    rating !== null &&
    (typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5)
  ) {
    return {
      ok: false,
      error: "rating must be null or an integer from 1 to 5",
    };
  }

  const notes = input.notes ?? "";
  if (typeof notes !== "string") {
    return { ok: false, error: "notes must be a string" };
  }

  return {
    ok: true,
    value: {
      title: input.title.trim(),
      author: input.author.trim(),
      status,
      rating,
      notes,
    },
  };
}
