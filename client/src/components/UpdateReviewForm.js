import React, { useState, useEffect } from 'react';

function UpdateReviewForm({ review, onUpdateReview }) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  useEffect(() => {
    setRating(review.rating);
    setComment(review.comment);
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/reviews/${review.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comment }),
    })
    .then(response => response.json())
    .then(updatedReview => {
      console.log(updatedReview);
      onUpdateReview(updatedReview);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} required />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={e => setComment(e.target.value)} required />
      </label>
      <button type="submit">Update Review</button>
    </form>
  );
}

export default UpdateReviewForm;
