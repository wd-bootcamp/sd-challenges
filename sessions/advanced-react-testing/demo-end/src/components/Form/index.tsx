import type { FormEvent } from "react";
import type { NewMovie } from "../../types";

type FormProps = {
  onAddMovie: (movie: NewMovie) => void;
};

export default function Form({ onAddMovie }: FormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    onAddMovie({
      name: String(formData.get("name")),
      isLiked: formData.get("isLiked") === "on",
    });
    form.reset();
    form.querySelector<HTMLInputElement>("#name")?.focus();
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Add a new movie</h2>
      <div className="fields">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Dr. Strange"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="isLiked">Like</label>
          <input id="isLiked" type="checkbox" name="isLiked" />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
