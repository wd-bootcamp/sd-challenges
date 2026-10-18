import MovieCard from "./MovieCard";

export default function MovieList({ movies, onToggleLiked }) {
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
