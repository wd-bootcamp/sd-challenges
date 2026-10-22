export default function CharacterCard({ character }) {
  return (
    <article className="card">
      <img
        src={character.image}
        alt={character.name}
        width="120"
        height="120"
      />
      <h3>{character.name}</h3>
      <p>
        {character.species} · {character.status}
      </p>
    </article>
  );
}
