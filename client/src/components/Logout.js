// Logout.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/logout', {
      method: 'DELETE',
      credentials: 'include',  // send cookies
    })
    .then(response => {
      if (response.ok) {
        setMessage("You've successfully logged out!");
        navigate('/login', { state: { message: "You've successfully logged out!" } }); // pass message as state to login route
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
    
      console.error(error);
    });
  }, []);

  return (
    <div>
      {message && <h1>{message}</h1>}
    </div>
  );
};

export default Logout;

