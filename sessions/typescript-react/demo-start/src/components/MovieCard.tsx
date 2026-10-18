import Button from "./Button";

export default function MovieCard({ title, isLiked, onToggleLiked }) {
  return (
    <li>
      <span>
        {isLiked ? "👍" : "👎"} {title}
      </span>
      <Button variant="secondary" onClick={onToggleLiked}>
        {isLiked ? "Dislike" : "Like"}
      </Button>
    </li>
  );
}
