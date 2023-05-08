import React, { useEffect, useState } from "react";
import "../App.css";
import Map from "./Map";
import Login from "./Login";
import Logout from './Logout';
import Signup from "./Signup";
import Navbar from "./Navbar";
import Events from './Events';
import AttendingEvents from "./AttendingEvents";

import UserContext from '../context/user';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [user, setUser] = useState(null); // Add a state variable for the current user

  const handleAttendance = (eventId) => {
    fetch('https://eventmanagement-o5zg.onrender.com/user_events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: eventId }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((newAttendance) => {
        // Fetch the specific event data
        fetch(`https://eventmanagement-o5zg.onrender.com/events/${eventId}`, {
          credentials: 'include',
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Error fetching event");
          })
          .then((event) => {
            setAttendingEvents([...attendingEvents, event]);
          })
          .catch((error) => {
            console.error("Error fetching event:", error);
          });
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    console.log("Attending Events:", attendingEvents);
  }, [attendingEvents]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Map initialLatitude={40.73061} initialLongitude={-73.935242} />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events onAttendance={handleAttendance}/>} />
          <Route path="/attending" element={<AttendingEvents events={attendingEvents} user={user}/>} />
          <Route path="/logout" element={<Logout setUser={setUser}/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
