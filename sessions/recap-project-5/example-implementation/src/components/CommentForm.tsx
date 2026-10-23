import type { FormEvent } from "react";

type CommentFormProps = {
  onAddComment: (text: string) => void;
};

export default function CommentForm({ onAddComment }: CommentFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const text = new FormData(form).get("comment");

    if (typeof text !== "string" || text.trim() === "") {
      return;
    }

    onAddComment(text.trim());
    form.reset();
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment">Your comment</label>
      <textarea id="comment" name="comment" rows={3} required />
      <button type="submit">Send</button>
    </form>
  );
}
