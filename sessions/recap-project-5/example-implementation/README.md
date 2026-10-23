# Recap Project 5: Art Gallery (Example Implementation)

One possible implementation of the Art Gallery app: React 19, TypeScript, React Router, SWR and plain CSS.

## Overview

- `src/App.tsx` fetches all art pieces with `useSWR` and holds the local information (favorite flag and comments) in one state, `artPiecesInfo`. It is stored in `localStorage` and combined with the fetched art pieces via the `slug`.
- Routes:
  - `/` shows the spotlight (a random art piece)
  - `/art-pieces` shows the gallery
  - `/art-pieces/:slug` shows the details of one art piece
  - `/favorites` shows all favorite art pieces
- The `Navigation` is rendered once in `App.tsx`, outside of `Routes`, so it appears on every page.
- `src/types.ts` contains the types `ArtPiece`, `ArtPieceInfo` and `Comment`.
- The components `Navigation`, `ArtPiecePreview` and `FavoriteButton` have tests (`*.test.tsx`).

## Development

To work locally, please install the dependencies using `npm i` first (Node.js 22.22 or newer is required).

Run `npm run dev` to start a development server and open the displayed URL in a browser.

### Scripts

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
- `npm run check` to type-check the project with TypeScript
- `npm run test` to run the tests with Vitest
