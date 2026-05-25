import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScoreProvider } from "./context/ScoreContext.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import GridSelect from "./pages/GridSelect.jsx";
import Game from "./pages/Game.jsx";

export default function App() {
  return (
    <ScoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home />} />

          <Route path="/select/:mode" element={<GridSelect />} />

          <Route path="/game/:mode" element={<Game />} />
          <Route path="/game/:mode/:size" element={<Game />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ScoreProvider>
  );
}
