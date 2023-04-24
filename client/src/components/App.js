import React, { useEffect, useState } from "react";
import "../App.css";
import Map from "./Map";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("Received events:", events);
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        console.log("Fetched events data:", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="App">
      <Map events={events} initialLatitude={40.73061} initialLongitude={-73.935242} />
    </div>
  );
}

export default App;
