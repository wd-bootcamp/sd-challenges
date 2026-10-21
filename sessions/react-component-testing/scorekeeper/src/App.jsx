import { useState } from "react";
import { nanoid } from "nanoid";
import Layout from "./components/Layout";
import GameForm from "./components/GameForm";
import Navigation from "./components/Navigation";
import GamePage from "./pages/GamePage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  const [view, setView] = useState("play");
  const [players, setPlayers] = useState([]);
  const [nameOfGame, setNameOfGame] = useState("");
  const [history, setHistory] = useState([]);

  function createGame({ nameOfGame, playerNames }) {
    setNameOfGame(nameOfGame);
    setPlayers(playerNames.map((name) => ({ name, score: 0, id: nanoid() })));
  }

  function endGame() {
    setHistory([{ players, nameOfGame, id: nanoid() }, ...history]);
    setPlayers([]);
    setNameOfGame("");
  }

  function resetScores() {
    setPlayers(players.map((player) => ({ ...player, score: 0 })));
  }

  function increasePlayerScore(index) {
    const currentPlayer = players[index];
    setPlayers([
      ...players.slice(0, index),
      { ...currentPlayer, score: currentPlayer.score + 1 },
      ...players.slice(index + 1),
    ]);
  }

  function decreasePlayerScore(index) {
    const currentPlayer = players[index];
    setPlayers([
      ...players.slice(0, index),
      { ...currentPlayer, score: currentPlayer.score - 1 },
      ...players.slice(index + 1),
    ]);
  }

  const isGameRunning = nameOfGame && players.length > 0;

  return (
    <Layout>
      {view === "history" ? (
        <HistoryPage history={history} />
      ) : isGameRunning ? (
        <GamePage
          players={players}
          nameOfGame={nameOfGame}
          onResetScores={resetScores}
          onEndGame={endGame}
          onIncreasePlayerScore={increasePlayerScore}
          onDecreasePlayerScore={decreasePlayerScore}
        />
      ) : (
        <GameForm onCreateGame={createGame} />
      )}
      <Navigation view={view} onChangeView={setView} />
    </Layout>
  );
}
