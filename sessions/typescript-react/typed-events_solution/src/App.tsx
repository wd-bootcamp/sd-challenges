import { useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import "./styles.css";

type Signup = {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
};

export default function App() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Signup["level"]>("beginner");
  const [signups, setSignups] = useState<Signup[]>([]);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  // `event.target.value` is only a `string`. The assertion tells TypeScript to trust us.
  // It is not completely safe: TypeScript does not check that the option values in the
  // JSX really are "beginner", "intermediate" or "advanced".
  function handleLevelChange(event: ChangeEvent<HTMLSelectElement>): void {
    setLevel(event.target.value as Signup["level"]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSignups([...signups, { name, level }]);
    setName("");
  }

  function handleReset(event: MouseEvent<HTMLButtonElement>): void {
    console.log(event.currentTarget.textContent);
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
