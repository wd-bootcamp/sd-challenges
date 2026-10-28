import type { Movie } from "../types";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  onToggleLiked: (id: string) => void;
};

export default function MovieList({ movies, onToggleLiked }: MovieListProps) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          isLiked={movie.isLiked}
          onToggleLiked={() => onToggleLiked(movie.id)}
        />
      ))}
    </ul>
  );
}
