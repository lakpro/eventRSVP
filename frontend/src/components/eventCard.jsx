import React, { useState } from "react";

const EventCard = ({ event, onRSVP, onUnRSVP, isRSVPed }) => {
  // Throttling helps prevent DoS attacks
  const [lastClickTime, setLastClickTime] = useState(0);
  const COOLDOWN = 1000; // 1 seconds

  const handleClick = (action) => {
    const now = Date.now();
    if (now - lastClickTime < COOLDOWN) return; // throttle active
    setLastClickTime(now); // update timestamp
    action(event.id);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const getTextDate = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${getTextDate(day)} ${month} ${year}`;
  }

  const eventDate = new Date(event.date);

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-1">{formatDate(eventDate)} </p>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <div className="flex gap-4">
        {isRSVPed ? (
          <button
            onClick={() => handleClick(onUnRSVP)}
            className="bg-red-500 flex-1 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Un-RSVP
          </button>
        ) : (
          <button
            onClick={() => handleClick(onRSVP)}
            className="bg-green-500 text-white flex-1 px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            RSVP
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
