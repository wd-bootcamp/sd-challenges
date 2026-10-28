import type { Movie } from "../types";

export function getLikeSummary(movies: Movie[]): string {
  if (movies.length === 0) {
    return "No movies yet";
  }

  const likedMovies = movies.filter((movie) => (movie.isLiked = true));

  return `${likedMovies.length} of ${movies.length} movies liked`;
}
