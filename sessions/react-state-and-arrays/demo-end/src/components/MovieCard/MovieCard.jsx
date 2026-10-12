import { useState } from "react";

export default function MovieCard({ movie }) {
  const { title, description, director, url, imdbRating } = movie;
  const [watched, setWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggleWatched() {
    setWatched(!watched);
  }

  function handleToggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  return (
    <section
      className={isFavorite ? "movie-card movie-card--favorite" : "movie-card"}
    >
      <h2 className="movie-card__title">
        {title}
        <span className="movie-card__rating">{imdbRating} IMDb</span>
      </h2>
      <span className="movie-card__director">by {director}</span>
      <img className="movie-card__image" src={url} alt={title}></img>
      <div className="movie-card__content">
        <p className="movie-card__description">{description}</p>
        <div className="movie-card__actions">
          <button type="button" onClick={handleToggleWatched}>
            {watched ? "Watched ✅" : "Mark as Watched"}
          </button>
          <button type="button" onClick={handleToggleFavorite}>
            {isFavorite ? "⭐ Favorited" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}
