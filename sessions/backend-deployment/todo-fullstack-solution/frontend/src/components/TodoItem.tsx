import { useState, type FormEvent } from "react";

import type { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<boolean>;
  onRename: (todo: Todo, title: string) => Promise<boolean>;
  onDelete: (todo: Todo) => Promise<boolean>;
};

export default function TodoItem({
  todo,
  onToggle,
  onRename,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() === "") return;

    const saved = await onRename(todo, title.trim());
    if (saved) setIsEditing(false); // keep the form open when saving failed
  }

  function handleCancel() {
    setTitle(todo.title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="todo-item">
        <form className="todo-form" onSubmit={handleSave}>
          <label htmlFor={`edit-${todo.id}`} className="visually-hidden">
            Edit todo
          </label>
          <input
            id={`edit-${todo.id}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
          <button type="submit" disabled={title.trim() === ""}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <label className={todo.done ? "todo-title done" : "todo-title"}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo)}
        />
        {todo.title}
      </label>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(todo)}>
        Delete
      </button>
    </li>
  );
}
