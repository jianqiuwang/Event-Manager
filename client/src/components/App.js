import React, { useEffect, useState } from "react";
import "../App.css";
import Map from "./Map";
import Login from "./Login"; 
import Signup from "./Signup";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
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

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Map events={events} initialLatitude={40.73061} initialLongitude={-73.935242} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
