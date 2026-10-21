export default function Form({ onAddMovie }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const isLiked = form.elements.isLiked.checked;

    onAddMovie({
      name,
      isLiked,
    });
    form.reset();
    form.elements.name.focus();
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Add a new movie</h2>
      <div className="fields">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Dr. Strange"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="isLiked">Like</label>
          <input id="isLiked" type="checkbox" name="isLiked" />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
