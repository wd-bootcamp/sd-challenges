import type { SubmitEvent } from "react";
import Button from "./Button";

type AddMovieFormProps = {
  onAddMovie: (title: string) => void;
};

export default function AddMovieForm({ onAddMovie }: AddMovieFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title"));

    onAddMovie(title);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" required />{" "}
      <Button variant="primary" type="submit">
        Add
      </Button>
    </form>
  );
}
