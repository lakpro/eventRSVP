const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../data/events.json");

// Load JSON file dynamically
exports.getAllEvents = (req, res) => {
  console.log("Getting all the events");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const events = JSON.parse(data);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to load events" });
  }
};

exports.rsvpEvent = (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const events = JSON.parse(data);
    const event = events.find((e) => e.id === eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.rsvpList.includes(userId)) {
      event.rsvpList.push(userId);
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    }

    res.json({ message: "User RSVPed", event });
  } catch (error) {
    res.status(500).json({ message: "RSVP failed" });
  }
};

exports.unrsvpEvent = (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const events = JSON.parse(data);
    const event = events.find((e) => e.id === eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const index = event.rsvpList.indexOf(userId);
    if (index !== -1) {
      event.rsvpList.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    }

    res.json({ message: "User un-RSVPed", event });
  } catch (error) {
    res.status(500).json({ message: "Un-RSVP failed" });
  }
};
