import { useState } from "react";
import "./styles.css";
import { initialCharacters, defaultImage } from "./data/characters";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";
import CharacterForm from "./pages/CharacterForm";

export default function App() {
  const [characters, setCharacters] = useState(initialCharacters);

  function handleAddCharacter({ name, species }) {
    const newCharacter = {
      id: characters.length + 1,
      name,
      species,
      status: "unknown",
      image: defaultImage,
    };

    setCharacters([...characters, newCharacter]);
  }

  return (
    <main>
      <Home />
      <CharacterList characters={characters} />
      <CharacterForm onAddCharacter={handleAddCharacter} />
    </main>
  );
}
