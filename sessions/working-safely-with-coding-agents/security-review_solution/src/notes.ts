const API_URL = "/api/notes";

export type NotePart = { text: string; bold: boolean };

/** Splits a note into plain and **bold** parts. The parts are rendered as text, never as HTML. */
export function parseNote(text: string): NotePart[] {
  return text
    .split(/(\*\*.+?\*\*)/g)
    .filter((part) => part !== "")
    .map((part) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4
        ? { text: part.slice(2, -2), bold: true }
        : { text: part, bold: false }
    );
}

/**
 * Only a convenience: it hides the button. The server has to check the role again,
 * because everybody can change this value in the browser.
 */
export function isAdmin(): boolean {
  return localStorage.getItem("role") === "admin";
}

// The API key lives on the server. This path is a proxy that adds it.
export async function saveNote(text: string): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

export async function deleteAllNotes(): Promise<void> {
  await fetch(API_URL, { method: "DELETE" });
}
