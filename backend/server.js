const express = require("express");
const cors = require("cors");
const scoreRoutes = require("./routes/scores");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/scores", scoreRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Tic-Tac-Toe JSON API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
