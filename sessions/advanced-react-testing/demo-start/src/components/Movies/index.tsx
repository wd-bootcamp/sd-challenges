import { uid } from "uid";
import { useState } from "react";
import Form from "../Form";
import Movie from "../Movie";
import Recommendations from "../Recommendations";
import type { MovieData, NewMovie } from "../../types";

type MoviesProps = {
  initialMovies?: MovieData[];
};

export default function Movies({ initialMovies = [] }: MoviesProps) {
  const [movies, setMovies] = useState(initialMovies);

  function handleAddMovie(newMovie: NewMovie) {
    setMovies([...movies, { id: uid(), ...newMovie }]);
  }

  function handleDeleteMovie(id: string) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function handleToggleLike(id: string) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  const likedCount = movies.filter((movie) => movie.isLiked).length;

  return (
    <>
      <h1>Favorite Movies</h1>
      <p className="movie-count">
        {movies.length} movies, {likedCount} liked
      </p>
      {movies.length === 0 && <p>No movies yet. Add one below.</p>}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              id={movie.id}
              name={movie.name}
              isLiked={movie.isLiked}
              onDeleteMovie={handleDeleteMovie}
              onToggleLike={handleToggleLike}
            />
          </li>
        ))}
      </ul>
      <Form onAddMovie={handleAddMovie} />
      <Recommendations onAddMovie={handleAddMovie} />
    </>
  );
}
