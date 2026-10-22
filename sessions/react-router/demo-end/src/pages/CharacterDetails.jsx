import { Link, useParams } from "react-router";

export default function CharacterDetails({ characters }) {
  const { id } = useParams();
  const character = characters.find((character) => character.id === Number(id));

  if (!character) {
    return (
      <>
        <h1>Character not found</h1>
        <Link to="/characters">Back to all characters</Link>
      </>
    );
  }

  return (
    <article className="details">
      <h1>{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        width="300"
        height="300"
      />
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <Link to="/characters">Back to all characters</Link>
    </article>
  );
}
