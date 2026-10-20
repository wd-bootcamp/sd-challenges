import Button from "../Button";

const MAX_HUE_VALUE = 120; // 120 is green
const MIN_HUE_VALUE = 0; // 0 is red

export default function Player({
  name,
  score,
  onDecreasePlayerScore,
  onIncreasePlayerScore,
}) {
  const maxHue = Math.min(score * 10, MAX_HUE_VALUE);
  const hue = Math.max(maxHue, MIN_HUE_VALUE);

  const color = score === 0 ? "black" : `hsl(${hue}, 50%, 50%)`;

  return (
    <section className="player">
      {name}
      <div className="player-score" style={{ color }}>
        <Button aria-label="Decrease Score" onClick={onDecreasePlayerScore}>
          -
        </Button>
        <span>{score}</span>
        <Button aria-label="Increase Score" onClick={onIncreasePlayerScore}>
          +
        </Button>
      </div>
    </section>
  );
}
