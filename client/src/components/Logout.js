// Logout.js
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';

const Logout = ({setAttendingEvents}) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    fetch('https://eventmanagement-o5zg.onrender.com/logout', {
      method: 'DELETE',
      credentials: 'include',  // send cookies
    })
    .then(response => {
      if (response.ok) {
        setUser(null);
        setAttendingEvents([])
        setMessage("You've successfully logged out!");
        navigate('/login', { state: { message: "You've successfully logged out!" } }); // pass message as state to login route
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
    
      console.error(error);
    });
  }, [navigate, setUser, setAttendingEvents]);

  return (
    <div>
      {message && <h1>{message}</h1>}
    </div>
  );
};

export default Logout;

