import type { Comment } from "../types";
import CommentForm from "./CommentForm";

type CommentsProps = {
  comments: Comment[];
  onAddComment: (text: string) => void;
};

export default function Comments({ comments, onAddComment }: CommentsProps) {
  return (
    <section>
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul className="comments">
        {comments.map((comment) => (
          <li key={comment.date}>
            <p>{comment.text}</p>
            <time dateTime={comment.date}>
              {new Date(comment.date).toLocaleString()}
            </time>
          </li>
        ))}
      </ul>
      <CommentForm onAddComment={onAddComment} />
    </section>
  );
}
