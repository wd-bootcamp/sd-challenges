import { useState } from "react";
import { deleteAllNotes, isAdmin, parseNote, saveNote } from "../../notes";

export default function NotesPanel() {
  const [notes, setNotes] = useState<string[]>([]);
  const [text, setText] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") {
      return;
    }
    await saveNote(text);
    setNotes([...notes, text]);
    setText("");
  }

  async function handleDeleteAll() {
    await deleteAllNotes();
    setNotes([]);
  }

  return (
    <section className="notes">
      <h2>Notes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Note
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="submit">Add note</button>
      </form>
      {isAdmin() && (
        <button type="button" onClick={handleDeleteAll}>
          Delete all notes
        </button>
      )}
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {parseNote(note).map((part, partIndex) =>
              part.bold ? (
                <strong key={partIndex}>{part.text}</strong>
              ) : (
                <span key={partIndex}>{part.text}</span>
              )
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
