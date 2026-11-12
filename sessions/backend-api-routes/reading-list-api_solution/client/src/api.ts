import type { Book, NewBook, Status } from "./types";

// The API runs on another origin (port 3001). The server must allow it with CORS.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: init.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    // fetch only rejects when there is no response at all (server down, CORS blocked).
    throw new Error("Cannot reach the API. Is the server running?");
  }

  if (!response.ok) {
    // The API sends { error: "<message>" } for every error.
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed (${response.status})`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export type BookFilter = { status?: Status; q?: string };

export function listBooks({ status, q }: BookFilter = {}): Promise<Book[]> {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (q) params.set("q", q);
  const query = params.size > 0 ? `?${params}` : "";
  return request<Book[]>(`/books${query}`);
}

export function createBook(
  book: Pick<NewBook, "title" | "author"> & Partial<NewBook>
): Promise<Book> {
  return request<Book>("/books", {
    method: "POST",
    body: JSON.stringify(book),
  });
}

export function replaceBook(id: string, book: NewBook): Promise<Book> {
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
