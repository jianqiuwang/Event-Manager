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
  const [events, setEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [user, setUser] = useState(null); // Add a state variable for the current user

  useEffect(() => {
    fetch("https://eventmanagement-o5zg.onrender.com/events",{
      credentials: 'include', 
  })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching events");
      })
      .then((data) => {
        console.log("Fetched events data:", data);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleAttendance = (eventId) => {
    fetch('https://eventmanagement-o5zg.onrender.com/user_events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: eventId }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((newAttendance) => {
        // Find the event in the events array and add it to the attendingEvents array
        const event = events.find(event => event.id === eventId);
        if (event) {
          setAttendingEvents([...attendingEvents, event]);
        }
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
          <Route path="/" element={<Map events={events} initialLatitude={40.73061} initialLongitude={-73.935242} />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events events={events} onAttendance={handleAttendance}/>} />
          <Route path="/attending" element={<AttendingEvents events={attendingEvents} user={user}/>} />
          <Route path="/logout" element={<Logout setUser={setUser}/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
