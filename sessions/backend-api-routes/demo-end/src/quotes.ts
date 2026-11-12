import type { Quote } from "./types";

// The "database": a plain array in memory.
// It is created again every time the server starts.
export const quotes: Quote[] = [
  {
    id: "q1",
    text: "Programs must be written for people to read.",
    author: "Harold Abelson",
  },
  {
    id: "q2",
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    id: "q3",
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
];
