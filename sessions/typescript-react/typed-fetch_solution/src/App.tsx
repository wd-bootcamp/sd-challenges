import { useEffect, useState } from "react";
import "./styles.css";

type Joke = {
  id: number;
  joke: string;
};

export default function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJokes(): Promise<void> {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/bad-jokes"
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: Joke[] = await response.json();
        setJokes(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
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
      {/* joke.text // Error: Property 'text' does not exist on type 'Joke'. */}
    </main>
  );
}
