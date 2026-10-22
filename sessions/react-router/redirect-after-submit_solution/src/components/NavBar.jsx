import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/new">Add character</Link>
    </nav>
  );
}
