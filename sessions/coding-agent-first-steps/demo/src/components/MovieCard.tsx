import Button from "./Button";

type MovieCardProps = {
  title: string;
  isLiked: boolean;
  onToggleLiked: () => void;
};

export default function MovieCard({
  title,
  isLiked,
  onToggleLiked,
}: MovieCardProps) {
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
