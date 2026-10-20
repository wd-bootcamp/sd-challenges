export default function CharacterForm({ onAddCharacter }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddCharacter(data);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a character</h1>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" required />
      <label htmlFor="species">Species</label>
      <input id="species" name="species" required />
      <button type="submit">Add character</button>
    </form>
  );
}
