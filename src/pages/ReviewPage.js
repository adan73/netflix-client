import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import NavigationBar from '../components/NavigationBar';
import NormalPageFooter from '../components/NormalPageFooter';

import '../CSS/style.css';

const ReviewPage = () => {
  const { movieId } = useParams();
  const userId = sessionStorage.getItem('userId');

  const [movie, setMovie] = useState(null);
  const [privateReviews, setPrivateReviews] = useState([]);
  const [publicReviews, setPublicReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchPrivateReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${userId}/${movieId}`);
      const data = await res.json();
      setPrivateReviews(data);
    } catch (err) {
      console.error(' Failed to fetch private reviews:', err);
    }
  };

  const fetchPublicReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${movieId}`);
      const data = await res.json();
      setPublicReviews(data);
    } catch (err) {
      console.error(' Failed to fetch public reviews:', err);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies/${movieId}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(' Failed to fetch movie:', err);
      }
    };

    fetchMovie();
    fetchPrivateReviews();
    fetchPublicReviews();
  }, [movieId, userId]);

  return (
    <div className="page-wrapper">
                <NavigationBar />
    <div className="review-page">
      

      {movie && (
        <div className="review-movie-info">
          <img src={movie.image} alt={movie.title} className="review-movie-image" />
          <h1>{movie.title}</h1>
          <div className="review-movie-details">
            <strong>Description:</strong>
            <p>{movie.description}</p>
            <strong>Genres:</strong>
            <p> {movie.type}</p>
            <strong>Year: </strong> 
            <p>{movie.year}</p>
            <strong>Cast:</strong>
            <p> {movie.cast}</p>
            <button className="add-review-btn" onClick={() => setShowPopup(true)}>＋ New Review</button>
          </div>
        </div>
      )}


      {showPopup && (
        <ReviewForm
          movieId={movieId}
          userId={userId}
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            fetchPrivateReviews();
            fetchPublicReviews();
            setShowPopup(false);
          }}
        />
      )}

      <div className="review-list-section">
        <h2>Your Reviews</h2>
        {privateReviews.length === 0 ? (
          <p>Didn't make any reviews yet.</p>
        ) : (
            privateReviews.map((r, i) => (
                <div className="review-card" key={i}>
                  <p className="review-meta">
                    <strong>Rating:</strong>{' '}
                    <span className="star-display">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= r.rating ? 'filled-star' : 'empty-star'}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  </p>
                  <p className="review-text">{r.reviewText}</p>
                </div>
              ))
              
        )}

        <h2>Reviews</h2>
        {publicReviews.length === 0 ? (
          <p>No public reviews yet.</p>
        ) : (
          publicReviews.map((r, i) => (
            <div className="review-card" key={i}>
              <p className="review-meta">
                <strong>Rating:</strong>{' '}
                <span className="star-display">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= r.rating ? 'filled-star' : 'empty-star'}
                    >
                      ★
                    </span>
                  ))}
                </span>
              </p>
              <p className="review-text">{r.reviewText}</p>
            </div>
          ))
        )}
      </div>
      
    <NormalPageFooter />
    </div>

    </div>
  );
};

export default ReviewPage;
