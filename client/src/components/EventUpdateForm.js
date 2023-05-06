import React, { useState, useEffect } from 'react';
import './EventUpdateForm.css';

const EventUpdateForm = ({ event, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: event.id,
    name: event.name,
    start_time: event.start_time,
    end_time: event.end_time,
    location: event.location,
    description: event.description,
    image: event.image,
  });

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted) {
      setFormData({
        id: event.id,
        name: event.name,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        description: event.description,
        image: event.image,
      });
    }
  
    return () => {
      isMounted = false;
    };
  }, [event]);
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form className="event-update-form" onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label htmlFor="startDate">Start Date:</label>
        <input type="datetime-local" id="startDate" name="start_time" value={formData.start_time} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label htmlFor="endDate">End Date:</label>
        <input type="datetime-local" id="endDate" name="end_time" value={formData.end_time} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div className="input-field">
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />
      </div>
      <button type="submit">Update Event</button>
    </form>
  );
};

export default EventUpdateForm;
