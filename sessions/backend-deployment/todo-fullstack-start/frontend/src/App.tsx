import { useState } from "react";
import useSWR from "swr";

import { API_URL, createTodo, deleteTodo, fetcher, updateTodo } from "./api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import type { Todo } from "./types";

export default function App() {
  const {
    data: todos,
    error,
    isLoading,
    mutate,
  } = useSWR(`${API_URL}/todos`, fetcher);
  const [actionError, setActionError] = useState<string | null>(null);

  /**
   * Runs a request, then loads the list again. Shows the error message if the request failed.
   * Returns whether it worked, so a form knows if it can close.
   */
  async function run(action: () => Promise<unknown>): Promise<boolean> {
    setActionError(null);
    try {
      await action();
      await mutate();
      return true;
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      return false;
    }
  }

  return (
    <main>
      <h1>Todos</h1>

      <TodoForm
        onAdd={(title) => run(() => createTodo({ title, done: false }))}
      />

      {actionError && <p role="alert">{actionError}</p>}

      {isLoading && <p>Loading todos…</p>}

      {error && (
        <p role="alert">
          Could not load the todos. Is the backend running?{" "}
          <button type="button" onClick={() => mutate()}>
            Try again
          </button>
        </p>
      )}

      {todos?.length === 0 && <p>Nothing to do. Add your first todo above.</p>}

      <ul className="todo-list">
        {todos?.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={(t) =>
              run(() => updateTodo(t.id, { title: t.title, done: !t.done }))
            }
            onRename={(t, title) =>
              run(() => updateTodo(t.id, { title, done: t.done }))
            }
            onDelete={(t) => run(() => deleteTodo(t.id))}
          />
        ))}
      </ul>
    </main>
  );
}
