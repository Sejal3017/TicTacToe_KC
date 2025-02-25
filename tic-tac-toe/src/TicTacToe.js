import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function TicTacToe() {
  const [loading, setLoading] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([]);
  const winner = calculateWinner(board);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    if (board.some((cell) => cell !== null)) {
      setHistory([...history, { board, winner }]);
    }
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-2xl">Loading Tic-Tac-Toe...</div>;
  }

  if (!startGame) {
    return (
      <div className="flex flex-col items-center p-6 gap-6">
        <h1 className="text-2xl font-bold">Welcome to Tic-Tac-Toe</h1>
        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => setStartGame(true)} disabled={!player1 || !player2}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      {winner && <Confetti />}
      <h1 className="text-2xl font-bold">Tic-Tac-Toe</h1>
      <motion.div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 flex items-center justify-center text-3xl border-2 border-gray-400 rounded-lg"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </motion.div>
      <p className="text-lg">
        {winner ? `Congratulations ${winner === "X" ? player1 : player2}! You Won! 🎉` : `Next Player: ${isXNext ? player1 : player2}`}
      </p>
      <button className="p-2 bg-blue-500 text-white rounded" onClick={resetGame}>Reset Game</button>
      <h2 className="text-xl font-semibold mt-6">Game History</h2>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {history.map((game, index) => (
          <div key={index} className="p-4 border-2 border-gray-300 rounded-lg">
            <p className="font-semibold">Game {index + 1}: {game.winner ? `Winner: ${game.winner}` : "Draw"}</p>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {game.board.map((cell, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center border border-gray-400">
                  {cell}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}