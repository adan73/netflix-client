import React from 'react';
import MovieInfo from '../components/MovieInfo';
import SeriesInfo from '../components/SeriesInfo';
import '../CSS/style.css';

const MoreInfo = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop">
    <div className="more-info-modal">
      <button className="close-btn" onClick={onClose}>✕</button>
      {movie.isSeries ? (
        <SeriesInfo data={movie} />
      ) : (
        <MovieInfo data={movie} />
      )}
    </div>
    </div>
  );
};

export default MoreInfo;
