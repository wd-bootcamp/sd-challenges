import { uid } from "uid";
import { useState } from "react";
import Form from "../Form";
import Movie from "../Movie";

export default function Movies({ initialMovies = [] }) {
  const [movies, setMovies] = useState(initialMovies);

  function handleAddMovie(newMovie) {
    setMovies([...movies, { id: uid(), ...newMovie }]);
  }

  function handleDeleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function handleToggleLike(id) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  return (
    <>
      <h1>Favorite Movies</h1>
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
    </>
  );
}
