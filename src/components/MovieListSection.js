import React, { useRef } from 'react';
import '../CSS/style.css';

const MovieListSection = ({ title, movies, onMovieClick }) => {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('active-drag');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('active-drag');
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('active-drag');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list-section">
      <h2 className="movie-list-title">{title}</h2>
      <div
        className="movie-list-row"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <img
              src={movie.image}
              alt={movie.title}
              onClick={() => onMovieClick(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListSection;
