import React, { useState, useEffect } from 'react';
import EventUpdateForm from './EventUpdateForm';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [newEventImage, setNewEventImage] = useState('')

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((eventData) => {
        setEvents(eventData);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleNewEventNameChange(e) {
    setNewEventName(e.target.value);
  }

  function handleNewEventDescriptionChange(e) {
    setNewEventDescription(e.target.value);
  }

  function handleNewEventLocationChange(e) {
    setNewEventLocation(e.target.value);
  }

  function handleNewEventStartTimeChange(e) {
    setNewEventStartTime(e.target.value);
  }

  function handleNewEventEndTimeChange(e) {
    setNewEventEndTime(e.target.value);
  }

  function handleNewEventImageChange(e) {
    setNewEventImage(e.target.value);
  }

  function handleCreateNewEvent(e) {
    e.preventDefault();
    const newEvent = {
      name: newEventName,
      description: newEventDescription,
      location: newEventLocation,
      startTime: newEventStartTime,
      endTime: newEventEndTime,
      image: newEventImage
    };
    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((newEvent) => {
        setEvents([...events, newEvent]);
      })
      .catch((error) => {
        console.error('Error creating new event:', error);
      });
  }

  const handleUpdateEvent = (updatedEvent) => {
    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        const updatedEvents = events.map((event) => 
          event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setEditingEventId(null); // Hide the form after updating
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };


  function handleDeleteEvent(id) {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  }

  const filtered = events.filter((event) =>
  event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-container">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search events"
          className="search-input"
        />
      </div>
      <form onSubmit={handleCreateNewEvent} className="create-event-form">
        <input
          type="text"
          value={newEventName}
          onChange={handleNewEventNameChange}
          placeholder="New event name"
        />
        <input
          type="text"
          value={newEventDescription}
          onChange={handleNewEventDescriptionChange}
          placeholder="New event description"
        />
        <input
          type="text"
          value={newEventLocation}
          onChange={handleNewEventLocationChange}
          placeholder="New event location"
        />
        <input
          type="datetime-local"
          value={newEventStartTime}
          onChange={handleNewEventStartTimeChange}
          placeholder="New event start time"
        />
        <input
          type="datetime-local"
          value={newEventEndTime}
          onChange={handleNewEventEndTimeChange}
          placeholder="New event end time"
        />
        <input
          type="text"
          value={newEventImage}
          onChange={handleNewEventImageChange}
          placeholder="New event image URL"
        />
        <button type="submit">Create New Event</button>
      </form>
      <div className="events-list">
        
      {filtered.map((event) =>
        editingEventId === event.id ? (
          <EventUpdateForm key={event.id} event={event} onUpdate={handleUpdateEvent} />
        ) : (
          <div key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>Start: {new Date(event.start_time).toLocaleString()}</p>
            <p>End: {new Date(event.end_time).toLocaleString()}</p>
            <img src={event.image_url} alt={event.name} style={{ width: '200px' }} />
            <button onClick={() => setEditingEventId(event.id)}>Update</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );

}
export default Events;
