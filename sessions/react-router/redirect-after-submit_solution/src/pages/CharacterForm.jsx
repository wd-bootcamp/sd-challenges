import { useNavigate } from "react-router";

export default function CharacterForm({ onAddCharacter }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddCharacter(data);
    navigate("/characters");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a character</h1>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" required />
      <label htmlFor="species">Species</label>
      <input id="species" name="species" required />
      <button type="submit">Add character</button>
      <button type="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </form>
  );
}
