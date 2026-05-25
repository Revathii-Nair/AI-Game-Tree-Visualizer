# AI Search-Tree Visualizer: Minimax & Alpha-Beta Showcase (MERN)

This is a full-stack web application designed to demonstrate and compare how search algorithms function. By playing Tic Tac Toe, you can observe the real-time performance of **Minimax** and **Alpha-Beta Pruning**.

---

## Project Objective

The goal of this project is to visualize adversarial search. It provides a practical look at how an AI evaluates game states and optimizes its decision-making process.

### Minimax Algorithm

- **Exhaustive Search:** The AI explores every possible future move to ensure it plays perfectly.
- **Recursive Evaluation:** It builds a complete game tree and assigns scores to every outcome.
- **Performance:** While highly accurate, it becomes computationally "expensive" as the board size grows because it never skips a branch.

### Alpha-Beta Pruning

- **Optimized Search:** This is an enhanced version of Minimax that significantly improves speed.
- **Pruning Logic:** The AI stops evaluating a branch as soon as it determines that the move cannot possibly be better than a previously examined option.
- **Identical Accuracy:** It achieves the same perfect result as Minimax but with much less processing power.

---

## AI Performance Metrics

This application tracks and displays specific data points to show the efficiency of each algorithm:

- **Nodes Visited:** A live counter showing the total number of board states the AI analyzed. This reveals the computational load of the search.
- **Branches Pruned:** A metric specifically for Alpha-Beta that counts how many potential moves were skipped to save time.
- **Algorithm Visualizer:** A real-time console that logs heuristic scores and decision paths as the AI "thinks."

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion.
- **Backend:** Node.js, Express.js.
- **Database:** Simple JSON storage for score tracking and game history.
- **Logic:** Custom recursive implementations of search algorithms in JavaScript.

---

## Project Structure

```text
AI-Search-Tree-Visualizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AlgoVisualizer.jsx  # Logs the search tree process
│   │   ├── utils/
│   │   │   ├── minimax.jsx         # Logic + Node counter
│   │   │   └── alphabeta.jsx       # Logic + Pruning counter
│   │   └── pages/
└── backend/
    └── routes/
        └── scores.js               # API for persistent leaderboards

```

---

## Installation

1. **Clone the Repository**

```bash
https://github.com/Revathii-Nair/AI-Game-Tree-Visualizer.git
cd AI-Game-Tree-Visualizer

```

2. **Backend Setup**

```bash
cd backend
npm install
npm start

```

3. **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

## Usage for Analysis

1. Launch the app and navigate to **Single Player**.
2. Select **Minimax** and play; check the **Nodes Visited** in the sidebar.
3. Press the "Show Algorithm Visualization" button to see text based logs.
4. Restart and select **Alpha-Beta Pruning**.
5. Compare the **Nodes Visited** count and observe the **Branches Pruned** metric to see the computational savings in real-time.
