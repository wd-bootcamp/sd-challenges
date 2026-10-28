import { useEffect, useState } from "react";
import type { Joke } from "../types";

export default function RandomJoke() {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    async function loadJoke(): Promise<void> {
      const response = await fetch(
        "https://example-apis.vercel.app/api/bad-jokes/0"
      );
      const data: Joke = await response.json();
      setJoke(data);
    }

    loadJoke();
  }, []);

  if (joke === null) {
    return <p>Loading…</p>;
  }

  return <p>{joke.joke}</p>;
}
