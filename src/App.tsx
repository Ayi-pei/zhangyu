import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import Videos from './pages/Videos';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:mode" element={<GamePlay />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;