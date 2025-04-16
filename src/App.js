import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import WhosWatchingPage from './pages/WhosWatchingPage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import NewPopular from './pages/New&Popular';
import MyListPage from './pages/MyListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/WhosWatchingPage" element={<WhosWatchingPage />} />
        <Route path="/TVShowsPage" element={<TVShowsPage />} />
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/New&Popular" element={<NewPopular />} />
        <Route path="/MyListPage" element={<MyListPage />} />

      </Routes>
    </Router>
  );
}

export default App;
