import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import WhosWatchingPage from './pages/WhosWatchingPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/WhosWatchingPage" element={<WhosWatchingPage />} />

      </Routes>
    </Router>
  );
}

export default App;
