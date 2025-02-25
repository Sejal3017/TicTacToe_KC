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
    return (
      <div className="bg-black flex h-screen w-full items-center justify-center text-white text-4xl">
        Loading TicTacToe...
        <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-cyan-500 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ml-4"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!startGame) {
    return (
        <div className="flex flex-col justify-center items-center p-10 bg-black text-white h-screen w-full">
  <div className="border-4 border-cyan-300 rounded-lg p-8 shadow-lg w-96 flex flex-col items-center">
    <h1 className="text-2xl font-bold text-center">Welcome to Tic-Tac-Toe</h1>
    <input
      type="text"
      placeholder="Enter Player 1 Name"
      value={player1}
      onChange={(e) => setPlayer1(e.target.value)}
      className="border p-2 rounded text-black mt-4 w-full"
    />
    <input
      type="text"
      placeholder="Enter Player 2 Name"
      value={player2}
      onChange={(e) => setPlayer2(e.target.value)}
      className="border p-2 rounded text-black mt-4 w-full"
    />
    <button
      className="relative inline-flex items-center justify-center p-0.5 mt-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 "
      onClick={() => setStartGame(true)}
      disabled={!player1 || !player2}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Start Game
      </span>
    </button>
  </div>
</div>
      
    );
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6 bg-black text-white h-full w-full">
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
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        onClick={resetGame}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          Reset Game
        </span>
      </button>
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
