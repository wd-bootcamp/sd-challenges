import { useState } from "react";
import type { ChangeEvent } from "react";
import AddMovieForm from "./components/AddMovieForm";
import MovieList from "./components/MovieList";
import RandomJoke from "./components/RandomJoke";
import Section from "./components/Section";
import type { Movie } from "./types";
import "./styles.css";

const initialMovies: Movie[] = [
  { id: "1", title: "The Matrix", isLiked: true },
  { id: "2", title: "Cats", isLiked: false },
  { id: "3", title: "Inception", isLiked: true },
];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [search, setSearch] = useState("");

  function handleToggleLiked(id: string): void {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  function handleAddMovie(title: string): void {
    setMovies([...movies, { id: crypto.randomUUID(), title, isLiked: false }]);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value);
  }

  const visibleMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <h1>Movie Tracker</h1>
      <Section title="My Movies">
        <input
          type="search"
          placeholder="Search movies"
          value={search}
          onChange={handleSearchChange}
        />
        <MovieList movies={visibleMovies} onToggleLiked={handleToggleLiked} />
      </Section>
      <Section title="Add a Movie">
        <AddMovieForm onAddMovie={handleAddMovie} />
      </Section>
      <Section title="Joke of the Day">
        <RandomJoke />
      </Section>
    </main>
  );
}
