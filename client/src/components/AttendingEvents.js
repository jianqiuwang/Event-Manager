function AttendingEvents({ events, onUnattendance }) {
  return (
    <div>
      <h1>Events I'm Attending</h1>
      {events.map((userEvent) => (
        <div key={userEvent.event.id}>
          <h3>{userEvent.event.name}</h3>
          <p>{userEvent.event.description}</p>
          <p>{userEvent.event.location}</p>
          <p>Start: {new Date(userEvent.event.start_time).toLocaleString()}</p>
          <p>End: {new Date(userEvent.event.end_time).toLocaleString()}</p>
          <img src={userEvent.event.image_url} alt={userEvent.event.name} style={{ width: '200px' }} />
          <button onClick={() => onUnattendance(userEvent.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default AttendingEvents;
