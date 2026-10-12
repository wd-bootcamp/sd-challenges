import "./Movies.css";
import "../MovieCard/MovieCard.css";
import { movies } from "../../lib/movies";
import MovieCard from "../MovieCard/MovieCard";

export default function Movies() {
  return (
    <main className="movies">
      <h1 className="movies__title">Some great movies</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
