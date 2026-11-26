import type { NewTodo, Todo } from "./types";

// Vite forwards /api to the backend (see vite.config.ts).
export const API_URL = "/api";

/** Reads the error message of the API ({ "error": "..." }) or falls back to a general one. */
async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body: { error?: string } = await response.json();
    if (body.error) return body.error;
  } catch {
    // The body is not JSON: use the general message.
  }
  return `Request failed (${response.status})`;
}

/** The fetcher for `useSWR`. */
export async function fetcher(url: string): Promise<Todo[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  const data: Todo[] = await response.json();
  return data;
}

export async function createTodo(newTodo: NewTodo): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  const data: Todo = await response.json();
  return data;
}

export async function updateTodo(id: string, todo: NewTodo): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  const data: Todo = await response.json();
  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(await getErrorMessage(response));
}
