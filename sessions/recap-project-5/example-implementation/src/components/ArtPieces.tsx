import type { ArtPiece, ArtPieceInfo } from "../types";
import { getInfo } from "../utils";
import ArtPiecePreview from "./ArtPiecePreview";

type ArtPiecesProps = {
  title: string;
  artPieces: ArtPiece[];
  artPiecesInfo: ArtPieceInfo[];
  onToggleFavorite: (slug: string) => void;
};

export default function ArtPieces({
  title,
  artPieces,
  artPiecesInfo,
  onToggleFavorite,
}: ArtPiecesProps) {
  return (
    <>
      <h1>{title}</h1>
      {artPieces.length === 0 && <p>No art pieces here yet.</p>}
      <ul className="art-list">
        {artPieces.map((artPiece) => (
          <li key={artPiece.slug}>
            <ArtPiecePreview
              artPiece={artPiece}
              isFavorite={getInfo(artPiecesInfo, artPiece.slug).isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
