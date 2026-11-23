export type Book = { id: string; title: string; author: string };

// The address of the API. A deployed client sets VITE_API_URL at build time.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

// The API answers every failure with { error }.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
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
