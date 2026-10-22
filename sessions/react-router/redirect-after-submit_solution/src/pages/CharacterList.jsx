import CharacterCard from "../components/CharacterCard";

export default function CharacterList({ characters }) {
  return (
    <>
      <h1>Characters</h1>
      <ul className="gallery">
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    </>
  );
}
