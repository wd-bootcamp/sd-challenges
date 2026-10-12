export default function MovieCard({ movie }) {
  const { title, description, director, url, imdbRating } = movie;
  return (
    <section className="movie-card">
      <h2 className="movie-card__title">
        {title}
        <span className="movie-card__rating">{imdbRating} IMDb</span>
      </h2>
      <span className="movie-card__director">by {director}</span>
      <img className="movie-card__image" src={url} alt={title}></img>
      <div className="movie-card__content">
        <p className="movie-card__description">{description}</p>
      </div>
    </section>
  );
}
