import Footer from "./components/Footer";
import Movies from "./components/Movies";
import type { MovieData } from "./types";

const initialMovies: MovieData[] = [
  {
    id: "28djdh72",
    name: "The Incredible Hulk",
    isLiked: false,
  },
  {
    id: "dknseu2",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "dkwi02ksk",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

export default function App() {
  return (
    <>
      <Movies initialMovies={initialMovies} />
      <Footer />
    </>
  );
}
