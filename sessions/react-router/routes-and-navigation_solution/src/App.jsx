import { Routes, Route } from "react-router";
import "./styles.css";
import { initialCharacters } from "./data/characters";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";

export default function App() {
  const characters = initialCharacters;

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
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </>
  );
}
