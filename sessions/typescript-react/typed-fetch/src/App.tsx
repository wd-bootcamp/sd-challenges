import { useEffect, useState } from "react";
import "./styles.css";

// Step 1: Define a type `Joke` that describes one joke from the API.

export default function App() {
  // Step 2: Type the three states:
  // - `jokes`: a list of jokes
  // - `error`: a message (string) or `null` if there is no error
  // - `isLoading`: a boolean
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJokes() {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/bad-jokes"
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        // Step 3: Give `data` the type of a list of jokes.
        const data = await response.json();
        setJokes(data);
      } catch (error) {
        // Step 4: In a `catch` block `error` has the type `unknown`.
        // Check with `error instanceof Error` before using `error.message`.
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadJokes();
  }, []);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <main>
      <h1>Bad Jokes</h1>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>{joke.joke}</li>
        ))}
      </ul>
      {/* Step 5: Try to use a property that doesn't exist, e.g. `joke.text`.
          Read the error message. Which mistake would have gone unnoticed without types? */}
    </main>
  );
}
