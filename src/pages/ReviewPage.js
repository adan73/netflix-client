import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import NavigationBar from '../components/NavigationBar';
import NormalPageFooter from '../components/NormalPageFooter';
import '../CSS/style.css';

const ReviewPage = () => {
  const { movieId } = useParams();
  const userId = sessionStorage.getItem('userId');
  const [editingReview, setEditingReview] = useState(null);

  const [movie, setMovie] = useState(null);
  const [privateReviews, setPrivateReviews] = useState([]);
  const [publicReviews, setPublicReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchPrivateReviews = async () => {
    try {
      const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/reviews/${userId}/${movieId}`);
      const data = await res.json();
      setPrivateReviews(data);
    } catch (err) {
      console.error(' Failed to fetch private reviews:', err);
    }
  };

  const fetchPublicReviews = async () => {
    try {
      const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/reviews/${movieId}`);
      const data = await res.json();
      setPublicReviews(data);
    } catch (err) {
      console.error('Failed to fetch public reviews:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://netflix-server-4a8a.onrender.com/api/reviews/${id}`, { method: 'DELETE' });
      fetchPrivateReviews();
    } catch (err) {
      alert(' Failed to delete review');
    }
  };

  const handleUpdate = async (review) => {
    try {
      const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/reviews/${review._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (res.ok) {
        setEditingReview(null);
        fetchPrivateReviews(); 
      } else {
        alert(' Update failed');
      }
    } catch (err) {
      alert('Server error while updating');
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
              <p>{movie.type}</p>
              <strong>Year:</strong>
              <p>{movie.year}</p>
              <strong>Cast:</strong>
              <p>{movie.cast}</p>
              <button className="add-review-btn" onClick={() => {
                setEditingReview(null); 
                setShowPopup(true);
              }}>＋ New Review</button>
            </div>
          </div>
        )}
  
        {showPopup && (
          <ReviewForm
            movieId={movieId}
            userId={userId}
            onClose={() => {
              setShowPopup(false);
              setEditingReview(null);
            }}
            onSuccess={() => {
              fetchPrivateReviews();
              fetchPublicReviews();
              setShowPopup(false);
              setEditingReview(null);
            }}
            initialData={editingReview}
          />
        )}
  
        <div className="review-list-section">
          <h2>Your Reviews</h2>
          {privateReviews.length === 0 ? (
            <p>Didn't make any reviews yet.</p>
          ) : (
            privateReviews.map((r) => (
              <div className="review-card" key={r._id}>
                {editingReview?._id === r._id ? (
                  <>
                    <textarea
                      value={editingReview.reviewText}
                      onChange={(e) =>
                        setEditingReview({ ...editingReview, reviewText: e.target.value })
                      }
                    />
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= editingReview.rating ? 'filled-star' : 'empty-star'}
                          onClick={() =>
                            setEditingReview({ ...editingReview, rating: star })
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <button onClick={() => handleUpdate(editingReview)}>Save</button>
                    <button onClick={() => setEditingReview(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p className="review-meta">
                      <strong>Rating:</strong>{' '}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= r.rating ? 'filled-star' : 'empty-star'}>
                          ★
                        </span>
                      ))}
                    </p>
                    <p className="review-text">{r.reviewText}</p>
                    <div className="review-actions">
                    <button onClick={() => setEditingReview(r)}>Edit</button>
                    <button onClick={() => handleDelete(r._id)}>Delete</button>
                    </div>
                  </>
                )}
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= r.rating ? 'filled-star' : 'empty-star'}>
                      ★
                    </span>
                  ))}
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
