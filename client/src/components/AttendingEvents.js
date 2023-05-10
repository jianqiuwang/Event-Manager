// AttendingEvents.js
import React from 'react';
import './AttendingEvents.css'

function AttendingEvents({ events, onUnattendance }) {
  return (
    <div>
      <h1>Events I'm Attending</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>Start: {new Date(event.start_time).toLocaleString()}</p>
          <p>End: {new Date(event.end_time).toLocaleString()}</p>
          <img src={event.image_url} alt={event.name} style={{ width: '200px' }} />
          <button onClick={() => onUnattendance(event.user_event_id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default AttendingEvents;
