export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const POS = ["Top-Left", "Top-Mid", "Top-Right", "Mid-Left", "Center", "Mid-Right", "Bot-Left", "Bot-Mid", "Bot-Right"];

export function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every((cell) => cell !== null)) return "draw";
  return null;
}

export function getWinningLine(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
  }
  return [];
}

export function getMinimaxMove(board) {
  let traceLogs = ["AI is using MINIMAX ALGORITHM..."];
  let bestScore = -Infinity;
  let move = -1;
  let nodesVisited = 0;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";

      traceLogs.push(`\n'O' AI tests playing ${POS[i]} as its first move...`);

      let score = minimax(board, 1, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  traceLogs.push(`\n✅ AI selects ${POS[move]}!`);
  return { bestMove: move, traceLogs, nodesVisited, nodesPruned: 0 };

  function minimax(currBoard, depth, isMaximizing) {
    nodesVisited++;

    const result = checkWinner(currBoard);
    if (result === "O") return 1;
    if (result === "X") return -1;
    if (result === "draw") return 0;

    const indent = "\u00A0".repeat(depth);

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currBoard[i]) {
          currBoard[i] = "O";
          if (depth < 5) traceLogs.push(` ${indent}'O' AI checks ${POS[i]}...`);

          let score = minimax(currBoard, depth + 1, false);
          currBoard[i] = null;

          const desc = score === 1 ? "AI WIN (+1)" : score === -1 ? "HUMAN WIN (-1)" : "DRAW (0)";
          traceLogs.push(`${indent}  ↳ Result: ${desc}`);

          maxEval = Math.max(maxEval, score);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currBoard[i]) {
          currBoard[i] = "X";
          if (depth < 5) traceLogs.push(`${indent}'X' Imagines human playing ${POS[i]}...`);

          let score = minimax(currBoard, depth + 1, true);
          currBoard[i] = null;

          minEval = Math.min(minEval, score);
        }
      }
      return minEval;
    }
  }
}
