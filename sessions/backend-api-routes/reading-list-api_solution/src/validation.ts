import type { NewBook } from "./types";
import { STATUSES, type Status } from "./types";

export type ParseResult = { value: NewBook } | { error: string };

function isStatus(value: unknown): value is Status {
  return STATUSES.includes(value as Status);
}

/**
 * Checks the body of POST and PUT and returns the clean data or the first error.
 * Only title, author, status, rating and notes are read, all other fields are ignored.
 */
export function parseBookInput(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { error: "Body must be a JSON object" };
  }
  const { title, author, status, rating, notes } = body as Record<
    string,
    unknown
  >;

  if (typeof title !== "string" || title.trim() === "") {
    return { error: "title is required" };
  }
  if (typeof author !== "string" || author.trim() === "") {
    return { error: "author is required" };
  }
  if (status !== undefined && !isStatus(status)) {
    return { error: `status must be one of: ${STATUSES.join(", ")}` };
  }
  if (
    rating !== undefined &&
    rating !== null &&
    !(
      Number.isInteger(rating) &&
      (rating as number) >= 1 &&
      (rating as number) <= 5
    )
  ) {
    return { error: "rating must be null or an integer from 1 to 5" };
  }
  if (notes !== undefined && typeof notes !== "string") {
    return { error: "notes must be a string" };
  }

  return {
    value: {
      title: title.trim(),
      author: author.trim(),
      status: status ?? "want-to-read",
      rating: (rating as number | null | undefined) ?? null,
      notes: notes ?? "",
    },
  };
}
