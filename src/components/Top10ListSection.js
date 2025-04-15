import React, { useRef } from 'react';
import '../CSS/style.css';

const Top10ListSection = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    rowRef.current.classList.add('active-drag');
    startX = e.pageX - rowRef.current.offsetLeft;
    scrollLeft = rowRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    rowRef.current.classList.remove('active-drag');
  };

  const handleMouseUp = () => {
    isDown = false;
    rowRef.current.classList.remove('active-drag');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list-section">
      <h2 className="movie-list-title">{title}</h2>
      <div className="top10-row-wrapper">
        <div
          className="top10-row"
          ref={rowRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {movies
            .sort((a, b) => a.rank - b.rank)
            .map((movie) => (
              <div
                className="top10-card"
                key={movie._id}
                onClick={() => onMovieClick(movie)}
              >
                <div className="top10-rank">{movie.rank}</div>
                <img
                  src={movie.top10Cover || movie.image}
                  alt={movie.title}
                  className="top10-image"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Top10ListSection;
