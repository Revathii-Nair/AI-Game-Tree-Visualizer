import { checkWinner, POS } from "./minimax.jsx";

export function getAlphaBetaMove(board) {
  let traceLogs = ["AI is using ALPHA-BETA PRUNING..."];
  let bestScore = -Infinity;
  let move = -1;
  let topAlpha = -Infinity;
  let topBeta = Infinity;
  let nodesVisited = 0;
  let nodesPruned = 0;

  function alphabeta(currBoard, depth, alpha, beta, isMaximizing) {
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

          let score = alphabeta(currBoard, depth + 1, alpha, beta, false);
          currBoard[i] = null;

          const desc = score === 1 ? "AI WIN (+1)" : score === -1 ? "HUMAN WIN (-1)" : "DRAW (0)";
          traceLogs.push(`${indent}  ↳ Result: ${desc}`);

          maxEval = Math.max(maxEval, score);
          alpha = Math.max(alpha, score);

          if (beta <= alpha) {
            if (depth < 5) traceLogs.push(`${indent}  ✂️ PRUNED! Human can force a worse outcome, so AI skips the rest of this path.`);
            nodesPruned++;
            break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currBoard[i]) {
          currBoard[i] = "X";
          if (depth < 5) traceLogs.push(`${indent}'X' Imagines human playing ${POS[i]}...`);

          let score = alphabeta(currBoard, depth + 1, alpha, beta, true);
          currBoard[i] = null;

          minEval = Math.min(minEval, score);
          beta = Math.min(beta, score);

          if (beta <= alpha) {
            if (depth < 5) traceLogs.push(`${indent}  ✂️ PRUNED! AI already has an equal or better move elsewhere, skipping.`);
            nodesPruned++;
            break;
          }
        }
      }
      return minEval;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      traceLogs.push(`\n'O' AI tests playing ${POS[i]} as its first move...`);

      let score = alphabeta(board, 1, topAlpha, topBeta, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
      topAlpha = Math.max(topAlpha, score);
    }
  }

  traceLogs.push(`\n✅ AI selects ${POS[move]}!`);
  return { bestMove: move, traceLogs, nodesVisited, nodesPruned };
}
