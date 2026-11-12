import type { NewQuote } from "./types";

type ParseResult = { value: NewQuote } | { error: string };

export function parseQuote(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { error: "Body must be a JSON object" };
  }
  const { text, author } = body as Record<string, unknown>;

  if (typeof text !== "string" || text.trim() === "") {
    return { error: "text is required" };
  }
  if (typeof author !== "string" || author.trim() === "") {
    return { error: "author is required" };
  }
  return { value: { text: text.trim(), author: author.trim() } };
}
