import React, { useEffect, useState } from "react";
import EventCard from "./eventCard"; // adjust the path if needed
import axios from "axios";

// hardcoded users for testing
const USERS = [
  {
    id: "1",
    username: "alice",
  },
  {
    id: "2",
    username: "bob",
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(USERS[0].id); // Default user is the first user in the array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the user ID based on the selected value
  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  const fetchEvents = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data.events);
      setLoading(false); // Stop loading after fetching
    } catch (err) {
      setLoading(false); // Stop loading even if there is an error
      setError("Unable to fetch events. Please try again later.");
    }
  };

  const handleRSVP = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`, {
        userId: userId,
      });
      fetchEvents();
    } catch (err) {
      console.error("RSVP failed", err);
      alert("Failed to RSVP. Please try again."); // Show an alert if RSVP fails
    }
  };

  const handleUnRSVP = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/unrsvp`, {
        userId: userId,
      });
      fetchEvents();
    } catch (err) {
      console.error("Un-RSVP failed", err);
      alert("Failed to Un-RSVP. Please try again."); // Show an alert if Un-RSVP fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Dropdown for user selection */}
      <div className="mb-6 flex items-center pt-5">
        <h1 className="font-bold text-xl inline mr-2"> SELECT USER </h1>
        <select
          value={userId}
          onChange={handleUserChange}
          className=" px-4 py-2 border rounded-md bg-white"
        >
          {USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/* Event cards for the user */}
      <h1 className="text-3xl font-bold mb-6 mt-10">Events</h1>

      {/* Loading or Error state */}
      {loading && events.length === 0 && (
        <p className="text-center text-xl text-gray-500">Loading events...</p>
      )}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      {/* No events found message */}
      {events.length === 0 && !loading && !error && (
        <p className="text-center text-xl text-gray-500">
          No events available at the moment.
        </p>
      )}

      {/* Normal showing events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90vw] mx-auto">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onRSVP={handleRSVP}
            onUnRSVP={handleUnRSVP}
            isRSVPed={event.rsvpList.includes(userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
