import { useState, type FormEvent } from "react";
import { createBook, validateBook, type Book, type BookErrors, type BookInput } from "../../books";

type BookFormProps = {
  onAdd: (book: Book) => void;
};

const emptyInput: BookInput = { title: "", author: "", year: "" };

export function BookForm({ onAdd }: BookFormProps) {
  const [input, setInput] = useState<BookInput>(emptyInput);
  const [errors, setErrors] = useState<BookErrors>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateBook(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }
    onAdd(createBook(input));
    setInput(emptyInput);
  }

  function field(name: keyof BookInput, label: string, type: string) {
    return (
      <label className="book-form-field">
        {label}
        <input
          type={type}
          value={input[name]}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          onChange={(event) => setInput({ ...input, [name]: event.target.value })}
        />
        {errors[name] && (
          <span id={`${name}-error`} className="book-form-error" role="alert">
            {errors[name]}
          </span>
        )}
      </label>
    );
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      {field("title", "Title", "text")}
      {field("author", "Author", "text")}
      {field("year", "Year", "number")}
      <button type="submit">Add book</button>
    </form>
  );
}
