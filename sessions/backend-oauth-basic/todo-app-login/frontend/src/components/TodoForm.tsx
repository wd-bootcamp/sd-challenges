import { useState, type FormEvent } from "react";

type TodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() === "") return;

    setIsSaving(true);
    try {
      const saved = await onAdd(title.trim());
      if (saved) setTitle(""); // keep the text when saving failed
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="new-todo" className="visually-hidden">
        New todo
      </label>
      <input
        id="new-todo"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit" disabled={isSaving || title.trim() === ""}>
        Add
      </button>
    </form>
  );
}
