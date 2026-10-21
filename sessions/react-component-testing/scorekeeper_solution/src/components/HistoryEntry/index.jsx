import { useState } from "react";
import Button from "../Button";

export default function HistoryEntry({ nameOfGame, players }) {
  const [scoreToggle, setScoreToggle] = useState(false);

  return (
    <section className="history-entry">
      <span className="history-entry-title">{nameOfGame}</span>
      <Button onClick={() => setScoreToggle(!scoreToggle)}>Show score</Button>
      {scoreToggle &&
        players.map(({ name, score, id }) => (
          <div className="history-entry-player" key={id}>
            <span>{name}</span>
            <span>{score}</span>
          </div>
        ))}
    </section>
  );
}
