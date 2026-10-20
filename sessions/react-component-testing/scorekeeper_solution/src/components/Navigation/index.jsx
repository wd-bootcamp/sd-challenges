export default function Navigation({ view, onChangeView }) {
  return (
    <nav className="navigation">
      <button
        type="button"
        className={view === "play" ? "nav-button active" : "nav-button"}
        aria-current={view === "play" ? "page" : undefined}
        onClick={() => onChangeView("play")}
      >
        Play
      </button>
      <button
        type="button"
        className={view === "history" ? "nav-button active" : "nav-button"}
        aria-current={view === "history" ? "page" : undefined}
        onClick={() => onChangeView("history")}
      >
        History
      </button>
    </nav>
  );
}
