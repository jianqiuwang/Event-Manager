import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import './Map.css';

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const Map = ({ events, initialLatitude, initialLongitude }) => {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [directions, setDirections] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const autocompleteRef = React.useRef(null);

  const showRoute = async (destination, origin) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDuration(leg.duration.text);
          setDistance(leg.distance.text);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const onSelect = (item) => {
    setSelectedEvent(item);
    if (userLocation) {
      showRoute(new window.google.maps.LatLng(item.latitude, item.longitude), userLocation);
    }
  };

  const onPlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setUserLocation(new window.google.maps.LatLng(lat, lng));
    if (selectedEvent) {
      showRoute(new window.google.maps.LatLng(selectedEvent.latitude, selectedEvent.longitude), new window.google.maps.LatLng(lat, lng));
    }
  };

  return (
    <div className="map-container">
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}  libraries={["places"]}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={() => onPlaceSelected(autocompleteRef.current.getPlace())}
      >
        <input
          type="text"
          placeholder="Enter your location"
          style={{ width: "100%", height: "40px", paddingLeft: "16px", marginTop: "16px", marginBottom: "8px" }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 39.50, lng: -98.35 }}
        zoom={4}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => onSelect(event)}
          />
        ))}
        {selectedEvent && (
          <InfoWindow
            position={{
              lat: selectedEvent.latitude,
              lng: selectedEvent.longitude,
            }}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <div>
              <strong>{selectedEvent.name}</strong>
              <p>{selectedEvent.description}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>
                Start Time: {new Date(selectedEvent.start_time).toLocaleString()}
              </p>
              <p>
                End Time: {new Date(selectedEvent.end_time).toLocaleString()}
              </p>
              <img src={selectedEvent.image_url} alt={selectedEvent.name} style={{ width: '200px' }} />
            </div>
          </InfoWindow>
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
    {distance && duration && (
        <div style={{ padding: '16px', backgroundColor: 'white', position: 'absolute', bottom: '16px', left: '16px', zIndex: 1000 }}>
          <p style={{ margin: '4px 0' }}><strong>Distance:</strong> {distance}</p>
          <p style={{ margin: '4px 0' }}><strong>Duration:</strong> {duration}</p>
        </div>
      )}
    </div>
    );
};

export default Map;