import Button from "../Button";
import Input from "../Input";

export default function GameForm({ onCreateGame }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formElements = form.elements;
    onCreateGame({
      nameOfGame: formElements.nameOfGame.value,
      playerNames: formElements.playerNames.value
        .split(",")
        .map((name) => name.trim()),
    });
    form.reset();
  }

  return (
    <form
      className="game-form"
      aria-labelledby="formHeader"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 id="formHeader">Create a new game</h2>
      <Input
        name="nameOfGame"
        labelText="Name of game"
        placeholder="e.g. Dodelido"
        required
      />
      <Input
        name="playerNames"
        labelText="Player names, separated by comma"
        placeholder="e.g. John Doe, Jane Doe"
        required
      />
      <Button>Create game</Button>
    </form>
  );
}
