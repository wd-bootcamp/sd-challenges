import { useState } from "react";
import { Routes, Route } from "react-router";
import "./styles.css";
import { initialCharacters, defaultImage } from "./data/characters";
import NavBar from "./components/NavBar";
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
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={<CharacterList characters={characters} />}
          />
          <Route
            path="/new"
            element={<CharacterForm onAddCharacter={handleAddCharacter} />}
          />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </>
  );
}
