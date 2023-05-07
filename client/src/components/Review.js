import React, { useContext, useState } from 'react';
import UserContext from '../context/user';
import UpdateReviewForm from './UpdateReviewForm';

function Review({ review, onReviewDelete, onReviewUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const user = useContext(UserContext);

  const handleDelete = () => {
    fetch(`https://eventmanagement-o5zg.onrender.com/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          onReviewDelete(review.id);
        }
      });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <UpdateReviewForm 
          review={review} 
          onUpdateReview={(updatedReview) => {
            onReviewUpdate(updatedReview);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <p>
            <strong>{review.rating}</strong> - {review.comment}
          </p>
          {user && user.id === review.user_id && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Review;
