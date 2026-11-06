import { useState, type FormEvent } from "react";
import { validateNewBook, type NewBookErrors, type NewBookInput } from "../../books";

export type AddBookFormProps = {
  onAdd: (input: NewBookInput) => void;
};

const empty: NewBookInput = { title: "", author: "", year: "" };

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [input, setInput] = useState<NewBookInput>(empty);
  const [errors, setErrors] = useState<NewBookErrors>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateNewBook(input);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onAdd(input);
      setInput(empty);
    }
  }

  function field(name: keyof NewBookInput, label: string) {
    return (
      <label>
        {label}
        <input
          name={name}
          value={input[name]}
          aria-invalid={errors[name] !== undefined}
          onChange={(event) => setInput({ ...input, [name]: event.target.value })}
        />
        {errors[name] && <span role="alert">{errors[name]}</span>}
      </label>
    );
  }

  return (
    <form className="add-book-form" aria-label="Add a book" onSubmit={handleSubmit}>
      {field("title", "Title")}
      {field("author", "Author")}
      {field("year", "Year")}
      <button type="submit">Add book</button>
    </form>
  );
}
