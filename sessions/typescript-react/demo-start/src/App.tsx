import { useState } from "react";
import MovieList from "./components/MovieList";
import Section from "./components/Section";
import "./styles.css";

const initialMovies = [
  { id: "1", title: "The Matrix", isLiked: true },
  { id: "2", title: "Cats", isLiked: false },
  { id: "3", title: "Inception", isLiked: true },
];

export default function App() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleLiked(id) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  return (
    <main>
      <h1>Movie Tracker</h1>
      <Section title="My Movies">
        <MovieList movies={movies} onToggleLiked={handleToggleLiked} />
      </Section>
    </main>
  );
}
