import { useState } from "react";

function App() {
  return (
    <div>
      <Game />
    </div>
  );
}

export default App;

function Game() {
  const [onPlay, setOnPlay] = useState(true);
  const [moves, setMoves] = useState(Array.from({ length: 9 }, (_) => null));
  const [curPlayer, setCurPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setOnPlay(!onPlay);
        return squares[a];
      }
    }
    if (moves.filter((el) => el === null).length === 0 && !winner) {
      setOnPlay(false);
      return "draw";
    }
    return "";
  }

  const handleMove = function (val) {
    if (!onPlay || moves[val]) return;
    const movesCopy = moves;
    movesCopy[val] = curPlayer;
    setMoves(movesCopy);
    setCurPlayer(curPlayer === "X" ? "O" : "X");
    const status = calculateWinner(moves);
    if (status) setWinner(status);
  };

  const handleRestart = function () {
    setMoves(Array.from({ length: 9 }, (_) => null));
    setWinner("");
    setOnPlay(true);
    setCurPlayer("X");
  };

  return (
    <div className="app">
      <Heading>{onPlay ? `It's ${curPlayer}'s move` : "Game Over"}</Heading>
      <GameContainer moves={moves} onClick={handleMove} />
      {winner && <WinnerPopup winner={winner} setWinner={setWinner} />}
      <RestartBtn onClick={handleRestart} />
    </div>
  );
}

function GameContainer({ moves, onClick }) {
  return (
    <div className="game-container">
      {moves.map((val, i) => (
        <Box value={val} key={i} num={i} className="box" onClick={onClick} />
      ))}
    </div>
  );
}

function Box({ value, onClick, num }) {
  return (
    <button
      key={value}
      className={`box animated ${value === "O" ? "color--o" : "color--x"}`}
      onClick={() => onClick(num)}
    >
      {value}
    </button>
  );
}

function WinnerPopup({ winner, setWinner }) {
  return (
    <div className="winner-popup">
      <button className="close-popup" onClick={() => setWinner("")}>
        &#x2715;
      </button>
      <p>
        {winner === "draw"
          ? `It's a draw! Try again.`
          : `${winner} is the winner 🎉`}
      </p>
    </div>
  );
}

function RestartBtn({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      Restart
    </button>
  );
}

function Heading({ children }) {
  return <h1>{children}</h1>;
}
