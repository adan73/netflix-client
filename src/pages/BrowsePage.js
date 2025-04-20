import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../CSS/style.css';
import NormalPageFooter from '../components/NormalPageFooter';

const BrowsePage = () => {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState('English');
  const [audio, setAudio] = useState('Original Language');
  const [sortBy, setSortBy] = useState('Suggestions For You');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('https://netflix-server-4a8a.onrender.com/api/movies');
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="page-wrapper">
      <NavigationBar />

      <div className="browse-page-container">
        <div className="browserHeader">
        <h2 className="browse-title">Browse</h2>

        <div className="browse-filters">
          <label>Select Your Preferences</label>
          <select value={audio} onChange={(e) => setAudio(e.target.value)} className="ShortSelect">
            <option>Original Language</option>
            <option>Dubbed</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hebrew</option>
            <option>Arabic</option>
          </select>
          <label>Sort by </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Suggestions For You</option>
            <option>Top Rated</option>
            <option>Recently Added</option>
          </select>
        </div>
        </div>
        <div className="browse-grid">
          {movies.map((movie) => (
            <div className="browse-card" key={movie._id}>
              <img src={movie.image} alt={movie.title} className="browse-img" />
              {movie.lists?.includes('top10') && <div className="tag red">Top 10</div>}
              {movie.lists?.includes('new') && <div className="tag red">Recently Added</div>}
              {movie.lists?.includes('leaving') && <div className="tag red">Leaving Soon</div>}
            </div>
          ))}</div> <NormalPageFooter />
        </div>
       

      
    </div>
  );
};

export default BrowsePage;
