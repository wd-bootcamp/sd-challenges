import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import useSWR from "swr";
import "./styles.css";
import type { ArtPiece, ArtPieceInfo } from "./types";
import { getInfo } from "./utils";
import Navigation from "./components/Navigation";
import Spotlight from "./components/Spotlight";
import ArtPieces from "./components/ArtPieces";
import ArtPieceDetails from "./components/ArtPieceDetails";

const API_URL = "https://example-apis.vercel.app/api/art";
const STORAGE_KEY = "art-pieces-info";

async function fetcher(url: string): Promise<ArtPiece[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: ArtPiece[] = await response.json();
  return data;
}

function loadArtPiecesInfo(): ArtPieceInfo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const data: ArtPieceInfo[] = JSON.parse(stored);
    return data;
  }
  return [];
}

export default function App() {
  const { data: artPieces, error, isLoading } = useSWR(API_URL, fetcher);
  const [artPiecesInfo, setArtPiecesInfo] =
    useState<ArtPieceInfo[]>(loadArtPiecesInfo);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artPiecesInfo));
  }, [artPiecesInfo]);

  function saveInfo(info: ArtPieceInfo): void {
    const otherInfos = artPiecesInfo.filter((item) => item.slug !== info.slug);
    setArtPiecesInfo([...otherInfos, info]);
  }

  function handleToggleFavorite(slug: string): void {
    const info = getInfo(artPiecesInfo, slug);
    saveInfo({ ...info, isFavorite: !info.isFavorite });
  }

  function handleAddComment(slug: string, text: string): void {
    const info = getInfo(artPiecesInfo, slug);
    const comment = { text, date: new Date().toISOString() };
    saveInfo({ ...info, comments: [...info.comments, comment] });
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (isLoading || !artPieces) {
    return <p>Loading…</p>;
  }

  const favoriteArtPieces = artPieces.filter(
    (artPiece) => getInfo(artPiecesInfo, artPiece.slug).isFavorite
  );

  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Spotlight
                artPieces={artPieces}
                artPiecesInfo={artPiecesInfo}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/art-pieces"
            element={
              <ArtPieces
                title="Gallery"
                artPieces={artPieces}
                artPiecesInfo={artPiecesInfo}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/art-pieces/:slug"
            element={
              <ArtPieceDetails
                artPieces={artPieces}
                artPiecesInfo={artPiecesInfo}
                onToggleFavorite={handleToggleFavorite}
                onAddComment={handleAddComment}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <ArtPieces
                title="Favorites"
                artPieces={favoriteArtPieces}
                artPiecesInfo={artPiecesInfo}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
      <Navigation />
    </>
  );
}
