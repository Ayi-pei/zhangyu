import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import Videos from './pages/Videos';
import Profile from './pages/Profile';
import CustomerSupport from './pages/CustomerSupport'; // 新添加客服聊天页面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:mode" element={<GamePlay />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer-support" element={<CustomerSupport />} /> {/* 添加客服聊天页面的路由 */}
      </Routes>
    </Router>
  );
}

export default App;