import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { ArtPiece } from "../types";
import ArtPiecePreview from "./ArtPiecePreview";

const artPiece: ArtPiece = {
  slug: "the-harvesters",
  artist: "Pieter Bruegel the Elder",
  name: "The Harvesters",
  imageSource: "https://example.com/the-harvesters.jpg",
  year: "1565",
  genre: "Landscape Painting",
  colors: ["#4D3C25"],
  dimensions: { height: 1415, width: 1920, type: "jpg" },
};

describe("ArtPiecePreview", () => {
  it("renders the image, the title and the artist", () => {
    render(
      <MemoryRouter>
        <ArtPiecePreview
          artPiece={artPiece}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("img", { name: "The Harvesters" })).toHaveAttribute(
      "src",
      artPiece.imageSource
    );
    expect(
      screen.getByRole("heading", { name: "The Harvesters" })
    ).toBeInTheDocument();
    expect(screen.getByText("Pieter Bruegel the Elder")).toBeInTheDocument();
  });

  it("links to the details page", () => {
    render(
      <MemoryRouter>
        <ArtPiecePreview
          artPiece={artPiece}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/art-pieces/the-harvesters"
    );
  });
});
