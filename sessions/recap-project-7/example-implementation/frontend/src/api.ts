import type { Book, NewBook, StatusFilter } from "./types";

/** Thrown for every failed request, with a message that can be shown to the user. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number | null
  ) {
    super(message);
  }
}

// Relative URL: in development the dev server proxies /api to the backend.
const BASE_URL = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    throw new ApiError(
      "Cannot reach the server. Is the backend running?",
      null
    );
  }

  if (!response.ok) {
    // The backend answers errors as { "error": "<message>" }.
    const body: { error?: string } | null = await response
      .json()
      .catch(() => null);
    throw new ApiError(
      body?.error ?? `Request failed (${response.status})`,
      response.status
    );
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function getHealth(): Promise<{ status: string }> {
  return request<{ status: string }>("/health");
}

export function listBooks(
  filter: { status: StatusFilter; q: string },
  signal?: AbortSignal
): Promise<Book[]> {
  const params = new URLSearchParams();
  if (filter.status !== "all") params.set("status", filter.status);
  if (filter.q.trim()) params.set("q", filter.q.trim());
  const query = params.toString();
  return request<Book[]>(`/books${query ? `?${query}` : ""}`, { signal });
}

export function getBook(id: string): Promise<Book> {
  return request<Book>(`/books/${encodeURIComponent(id)}`);
}

export function createBook(book: NewBook): Promise<Book> {
  return request<Book>("/books", {
    method: "POST",
    body: JSON.stringify(book),
  });
}

export function updateBook(id: string, book: NewBook): Promise<Book> {
  return request<Book>(`/books/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
}

export function deleteBook(id: string): Promise<void> {
  return request<void>(`/books/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
