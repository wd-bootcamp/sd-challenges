import { Link, useNavigate, useParams } from "react-router";
import type { ArtPiece, ArtPieceInfo } from "../types";
import { getInfo } from "../utils";
import ColorPalette from "./ColorPalette";
import Comments from "./Comments";
import FavoriteButton from "./FavoriteButton";

type ArtPieceDetailsProps = {
  artPieces: ArtPiece[];
  artPiecesInfo: ArtPieceInfo[];
  onToggleFavorite: (slug: string) => void;
  onAddComment: (slug: string, text: string) => void;
};

export default function ArtPieceDetails({
  artPieces,
  artPiecesInfo,
  onToggleFavorite,
  onAddComment,
}: ArtPieceDetailsProps) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artPiece = artPieces.find((item) => item.slug === slug);

  if (!artPiece) {
    return (
      <>
        <h1>Art piece not found</h1>
        <Link to="/art-pieces">Back to the gallery</Link>
      </>
    );
  }

  const info = getInfo(artPiecesInfo, artPiece.slug);

  return (
    <article className="art-piece details">
      <button type="button" onClick={() => navigate("/art-pieces")}>
        ← Back
      </button>
      <img src={artPiece.imageSource} alt={artPiece.name} />
      <FavoriteButton
        isFavorite={info.isFavorite}
        onToggleFavorite={() => onToggleFavorite(artPiece.slug)}
      />
      <h1>{artPiece.name}</h1>
      <p>Artist: {artPiece.artist}</p>
      <p>Year: {artPiece.year}</p>
      <p>Genre: {artPiece.genre}</p>
      <ColorPalette colors={artPiece.colors} />
      <Comments
        comments={info.comments}
        onAddComment={(text) => onAddComment(artPiece.slug, text)}
      />
    </article>
  );
}
