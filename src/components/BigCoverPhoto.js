import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import { CiCircleInfo } from "react-icons/ci";

const BigCoverPhoto = ({ openMoreInfo }) => {
  const [covers, setCovers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://netflix-server-4a8a.onrender.com/api/movies/')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(movie => movie.cover === true);
        setCovers(filtered);
      })
      .catch(err => console.error('Failed to load covers:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % covers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [covers]);

  const handleManualClick = (index) => {
    setCurrentIndex(index);
  };

  const handleMoreInfoClick = () => {
    openMoreInfo(covers[currentIndex]);
  };

  if (covers.length === 0) return null;

  const currentMovie = covers[currentIndex];

  return (
    <div className="featured-movie" style={{ backgroundImage: `url(${currentMovie.screenshots[0]})` }}>
      <div className="featured-overlay">
        <img src={currentMovie.titleImage} alt={`${currentMovie.title} logo`} className="title-logo" />
        <p className="featured-description">{currentMovie.description}</p>
      </div>

      <button className="more-info-btn" onClick={handleMoreInfoClick}>
        <CiCircleInfo className="info-icon" />
        More Info
      </button>

      <div className="cover-dots">
        {covers.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => handleManualClick(i)}
          ></span>
        ))}
      </div>

      <div className="featured-fade-bottom"></div>
    </div>
  );
};

export default BigCoverPhoto;
