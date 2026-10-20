import { Link } from "react-router";
import type { ArtPiece } from "../types";
import FavoriteButton from "./FavoriteButton";

type ArtPiecePreviewProps = {
  artPiece: ArtPiece;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
};

export default function ArtPiecePreview({
  artPiece,
  isFavorite,
  onToggleFavorite,
}: ArtPiecePreviewProps) {
  return (
    <article className="art-piece">
      <Link to={`/art-pieces/${artPiece.slug}`}>
        <img src={artPiece.imageSource} alt={artPiece.name} />
      </Link>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggleFavorite={() => onToggleFavorite(artPiece.slug)}
      />
      <h2>{artPiece.name}</h2>
      <p>{artPiece.artist}</p>
    </article>
  );
}
