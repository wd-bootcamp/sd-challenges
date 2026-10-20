import HistoryEntry from "../components/HistoryEntry";

export default function HistoryPage({ history }) {
  return (
    <>
      <h2>Previous Games</h2>
      {history.length === 0 ? (
        <p>There is no history yet!</p>
      ) : (
        history.map(({ nameOfGame, players, id }) => (
          <HistoryEntry key={id} nameOfGame={nameOfGame} players={players} />
        ))
      )}
    </>
  );
}
