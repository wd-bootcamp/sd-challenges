import { STATUSES, type BookInput, type Status } from "../types.js";

type Result = { ok: true; value: BookInput } | { ok: false; error: string };

/**
 * Checks the body of POST and PUT and returns the editable fields with the
 * defaults applied. Unknown fields (id, _id, ...) are dropped on purpose.
 */
export function parseBookInput(body: unknown): Result {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object" };
  }
  const input = body as Record<string, unknown>;

  const title = typeof input.title === "string" ? input.title.trim() : "";
  if (!title) return { ok: false, error: "Title is required" };

  const author = typeof input.author === "string" ? input.author.trim() : "";
  if (!author) return { ok: false, error: "Author is required" };

  const status = input.status ?? "want-to-read";
  if (!STATUSES.includes(status as Status)) {
    return {
      ok: false,
      error: `Status must be one of: ${STATUSES.join(", ")}`,
    };
  }

  const rating = input.rating ?? null;
  if (
    rating !== null &&
    !(
      typeof rating === "number" &&
      Number.isInteger(rating) &&
      rating >= 1 &&
      rating <= 5
    )
  ) {
    return {
      ok: false,
      error: "Rating must be null or an integer from 1 to 5",
    };
  }

  const notes = input.notes ?? "";
  if (typeof notes !== "string") {
    return { ok: false, error: "Notes must be a string" };
  }

  return {
    ok: true,
    value: { title, author, status: status as Status, rating, notes },
  };
}

/** Reads the optional filters of GET /api/books. */
export function parseBookQuery(
  query: Record<string, unknown>
):
  | { ok: true; value: { status?: Status; q?: string } }
  | { ok: false; error: string } {
  const { status, q } = query;

  if (status !== undefined && status !== "") {
    if (typeof status !== "string" || !STATUSES.includes(status as Status)) {
      return {
        ok: false,
        error: `Status must be one of: ${STATUSES.join(", ")}`,
      };
    }
  }
  if (q !== undefined && typeof q !== "string") {
    return { ok: false, error: "Query q must be a single text" };
  }

  return {
    ok: true,
    value: {
      status: status ? (status as Status) : undefined,
      q: typeof q === "string" && q.trim() ? q.trim() : undefined,
    },
  };
}
