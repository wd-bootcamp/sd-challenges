export default function Movie({
  id,
  name,
  isLiked = false,
  onDeleteMovie = () => {},
  onToggleLike = () => {},
}) {
  return (
    <section className={isLiked ? "movie liked" : "movie"}>
      <h2>{name}</h2>
      <div className="movie-actions">
        <button
          type="button"
          className="round-button"
          title={isLiked ? `unlike ${name}` : `like ${name}`}
          aria-label={isLiked ? `unlike ${name}` : `like ${name}`}
          onClick={() => onToggleLike(id)}
        >
          {isLiked ? "👍" : "👎"}
        </button>
        <button
          type="button"
          className="round-button"
          title={`delete ${name}`}
          aria-label={`delete ${name}`}
          onClick={() => onDeleteMovie(id)}
        >
          ✕
        </button>
      </div>
    </section>
  );
}
