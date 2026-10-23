import { useState } from "react";
import "./styles.css";

// Step 1: Define a type `Signup` with `name` (string) and `level` (only "beginner",
// "intermediate" or "advanced").

export default function App() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [signups, setSignups] = useState([]);

  // Step 2: Type the event of the text input. Use `ChangeEvent<HTMLInputElement>`.
  function handleNameChange(event) {
    setName(event.target.value);
  }

  // Step 3: Type the event of the select element with `ChangeEvent<HTMLSelectElement>`.
  // `event.target.value` is a `string`, but `level` only allows three values.
  // Fix this, for example with a type assertion (`as Signup["level"]`),
  // and think about why this is not completely safe.
  function handleLevelChange(event) {
    setLevel(event.target.value);
  }

  // Step 4: Type the event of the form with `FormEvent<HTMLFormElement>`.
  function handleSubmit(event) {
    event.preventDefault();
    setSignups([...signups, { name, level }]);
    setName("");
  }

  // Step 5: Type the event of the reset button with `MouseEvent<HTMLButtonElement>`
  // and log `event.currentTarget.textContent`.
  function handleReset(event) {
    console.log(event);
    setSignups([]);
  }

  return (
    <main>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          required
        />{" "}
        <select value={level} onChange={handleLevelChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>{" "}
        <button type="submit">Sign up</button>
      </form>
      <ul>
        {signups.map((signup, index) => (
          <li key={index}>
            {signup.name} ({signup.level})
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </main>
  );
}
