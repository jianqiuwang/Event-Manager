import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import EventUpdateForm from './EventUpdateForm';
import CreateReviewForm from './CreateReviewForm';
import UpdateReviewForm from './UpdateReviewForm';

import './Events.css';

function Events({ events, onAttendance }) {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [newEventImage, setNewEventImage] = useState('')
  const [username] = useState("");

  // Event.js

const [editingReviewId, setEditingReviewId] = useState(null);
const [addingReviewEventId, setAddingReviewEventId] = useState(null);


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

  function geocodeAddress(address) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else {
          throw new Error(`Geocoding API error: ${data.status}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching geocoding data:', error);
        return null;
      });
  };

  function handleCreateNewEvent(e) {
    e.preventDefault();
    geocodeAddress(newEventLocation)
      .then((coordinates) => {
        if (!coordinates) {
          alert('Error geocoding the event location. Please try again.');
          return;
        }
        const newEvent = {
          name: newEventName,
          description: newEventDescription,
          location: newEventLocation,
          start_time: newEventStartTime,
          end_time: newEventEndTime,
          image_url: newEventImage,
          latitude: coordinates.lat, // include the latitude
          longitude: coordinates.lng // include the longitude
        };
        fetch("https://eventmanagement-o5zg.onrender.com/events", {
          method: "POST",
          credentials: 'include',
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
      });
    }

    const handleUpdateEvent = (updatedEvent) => {
        const { id, ...eventData } = updatedEvent;
      
        fetch(`https://eventmanagement-o5zg.onrender.com/events/${id}`, {
          method: "PATCH",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event: eventData, username: username }), // Include the username here
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
    fetch(`https://eventmanagement-o5zg.onrender.com/events/${id}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  }

  function handleAddReview(event, newReview) {
    fetch('/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newReview, event_id: event.id, user_id: user.id }),
    })
        .then((response) => response.json())
        .then((newReviewData) => {
            const updatedEventsData = events.map((e) => {
                if (e.id === event.id) {
                    return {
                        ...event,
                        reviews: event.reviews.concat(newReviewData),
                    };
                }
                return e;
            });
            setEvents(updatedEventsData);
            setAddingReviewEventId(null);
        });
}


function handleDelete(eventId, reviewId) {
    fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (res.ok) {
                const updatedEventsData = events.map((event) => {
                    if (event.id === eventId) {
                        return {
                            ...event,
                            reviews: event.reviews.filter((review) => review.id !== reviewId),
                        };
                    }
                    return event;
                });
                setEvents(updatedEventsData);
            }
        });
}
  
function updateEventReviews(event, updatedReview) {
    const updatedEventsData = events.map((e) => {
      if (e.id === event.id) {
        return {
          ...event,
          reviews: event.reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r)),
        };
      }
      return e;
    });
    setEvents(updatedEventsData);
  }
  
function renderReview(event, review) {
    return (
      <>
        <p>
          <strong>{review.username}</strong> - {review.rating}/10
        </p>
        <p>{review.comment}</p>
      </>
    );
  }
  
  

  const filtered = events.filter((event) =>
  event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("User object:", user);

  useEffect(() => {
    if (filtered.length > 0) {
      filtered.forEach(event => {
        if (event.reviews && event.reviews.length > 0) {
          console.log('Reviews data:', event.reviews);
        }
      });
    }
  }, [filtered]);
  

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
              {user && <button onClick={() => onAttendance(event.id)}>I'm Attending</button>}

              {user && <button onClick={() => setEditingEventId(event.id)}>Update</button>}
              {user && <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>}
              <h3>Reviews</h3>
              {user && addingReviewEventId === event.id ? (
                <CreateReviewForm
                  eventId={event.id}
                  onReviewAdded={(newReview) => {
                    handleAddReview(event, newReview);
                    setAddingReviewEventId(null);
                  }}
                  onCancel={() => setAddingReviewEventId(null)}
                />
              ) : user ? (
                <button onClick={() => setAddingReviewEventId(event.id)}>
                  Add a Review
                </button>
              ) : null}
              {event.reviews &&
                event.reviews.map((review) => (
                  <div key={review.id}>
                    {review.id === editingReviewId ? (
                      <UpdateReviewForm
                        review={review}
                        onUpdateReview={(updatedReview) => {
                          updateEventReviews(event, updatedReview);
                          setEditingReviewId(null);
                        }}
                      />
                    ) : (
                      renderReview(event, review)
                    )}
                    {user && user.username === review.username && (
                      <>
                        <button onClick={() => handleDelete(event.id, review.id)}>
                          Delete
                        </button>
                        <button onClick={() => setEditingReviewId(review.id)}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

}
export default Events;
