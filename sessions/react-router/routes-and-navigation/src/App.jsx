import "./styles.css";
import { initialCharacters } from "./data/characters";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";

export default function App() {
  return (
    <main>
      <Home />
      <CharacterList characters={initialCharacters} />
    </main>
  );
}
