import { createAuthClient } from "better-auth/react";

export type Book = { id: string; title: string; author: string };

// The address of the API. A deployed client sets VITE_API_URL at build time.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

// The Better Auth client: log in, log out and the session of the page. It talks to /api/auth of the API.
export const authClient = createAuthClient({
  baseURL: new URL(API_URL).origin,
  fetchOptions: { credentials: "include" },
});

// credentials: "include" makes the browser send the session cookie to the API (another origin).
// The API answers every failure with { error }, a 401 included.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: init.body ? { "Content-Type": "application/json" } : undefined,
    ...init,
  });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} ${body.error}`);
  }
  return body as T;
}

export const listBooks = () => request<Book[]>("/books");
export const addBook = (title: string, author: string) =>
  request<Book>("/books", {
    method: "POST",
    body: JSON.stringify({ title, author }),
  });
export const deleteBook = (id: string) =>
  request<void>(`/books/${id}`, { method: "DELETE" });
