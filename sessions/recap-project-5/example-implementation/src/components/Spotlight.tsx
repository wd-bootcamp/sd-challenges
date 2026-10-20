import { useState } from "react";
import type { ArtPiece, ArtPieceInfo } from "../types";
import { getInfo } from "../utils";
import FavoriteButton from "./FavoriteButton";

type SpotlightProps = {
  artPieces: ArtPiece[];
  artPiecesInfo: ArtPieceInfo[];
  onToggleFavorite: (slug: string) => void;
};

export default function Spotlight({
  artPieces,
  artPiecesInfo,
  onToggleFavorite,
}: SpotlightProps) {
  // Pick the random number once, so the spotlight doesn't change on re-render.
  const [randomNumber] = useState(Math.random());
  const artPiece = artPieces[Math.floor(randomNumber * artPieces.length)];

  if (!artPiece) {
    return <p>No art pieces found.</p>;
  }

  return (
    <>
      <h1>Spotlight</h1>
      <figure className="art-piece spotlight">
        <img src={artPiece.imageSource} alt={artPiece.name} />
        <FavoriteButton
          isFavorite={getInfo(artPiecesInfo, artPiece.slug).isFavorite}
          onToggleFavorite={() => onToggleFavorite(artPiece.slug)}
        />
        <figcaption>{artPiece.artist}</figcaption>
      </figure>
    </>
  );
}
