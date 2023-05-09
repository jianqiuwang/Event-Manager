import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/user';
import './Login.css';

const Login = ({fetchAttendingEvents}) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      alert(location.state.message);
    }
  }, [location.state]);

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://eventmanagement-o5zg.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
      credentials: 'include',  // send cookies
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed');
      }
    })
    .then(data => {
      // login successful
      console.log('User data:', data);
      setUser(data);
      fetchAttendingEvents();

      navigate('/');  // redirect to homepage
    })
    .catch(error => {
      // handle error
      console.error(error);
    });
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
