import { useEffect, useState } from "react";
import type { NewMovie, Recommendation } from "../../types";

type RecommendationsProps = {
  onAddMovie: (movie: NewMovie) => void;
};

export default function Recommendations({ onAddMovie }: RecommendationsProps) {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    let ignore = false;

    async function loadRecommendations() {
      try {
        const response = await fetch("/recommendations.json");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: Recommendation[] = await response.json();
        if (!ignore) {
          setRecommendations(data);
          setStatus("success");
        }
      } catch {
        if (!ignore) {
          setStatus("error");
        }
      }
    }

    loadRecommendations();

    return () => {
      ignore = true;
    };
  }, []);

  if (status === "loading") {
    return <p>Loading recommendations …</p>;
  }

  if (status === "error") {
    return <p role="alert">Could not load recommendations.</p>;
  }

  return (
    <section className="recommendations">
      <h2>Recommended for you</h2>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>
            {movie.name}{" "}
            <button
              type="button"
              aria-label={`add ${movie.name}`}
              onClick={() => onAddMovie({ name: movie.name, isLiked: false })}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
