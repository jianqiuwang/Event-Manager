import React, { useState } from 'react';

const CreateReviewForm = ({ eventId, onReviewAdded, onCancel }) => {
  console.log(`Event ID: ${eventId}`);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const review = {
      review: {
        rating,
        comment,
      },
    };

    fetch(`https://eventmanagement-o5zg.onrender.com/events/${eventId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      onReviewAdded(data);
      if (onCancel) onCancel();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" name="rating" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
      </label>

      <label>
        Comment:
        <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateReviewForm;
