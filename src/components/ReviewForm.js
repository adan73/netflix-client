import React, { useState } from 'react';
import '../CSS/style.css';

const ReviewForm = ({ movieId, userId, onClose, onSuccess }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      movieId,
      reviewText,
      isPublic,
      rating,
    };

    try {
      const res = await fetch('https://netflix-server-4a8a.onrender.com/api/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess(); 
      } else {
        alert(data.message || 'Error saving review');
      }
    } catch (err) {
      console.error(' Review error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="review-popup-backdrop">
      <div className="review-popup">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Write Your Review</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="5"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                onClick={() => setRating(num)}
                className={num <= rating ? 'filled-star' : ''}
              >
                ★
              </span>
            ))}
          </div>

          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            /> Make Public
          </label>
          <div className="popup-actions">
              <button type="submit">Submit Review</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
