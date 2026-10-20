import type { ArtPieceInfo } from "./types";

export function getInfo(
  artPiecesInfo: ArtPieceInfo[],
  slug: string
): ArtPieceInfo {
  return (
    artPiecesInfo.find((info) => info.slug === slug) ?? {
      slug,
      isFavorite: false,
      comments: [],
    }
  );
}
