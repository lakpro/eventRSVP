const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../data/events.json");

// Load JSON file dynamically
exports.getAllEvents = (req, res) => {
  console.log("Getting all the events");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const events = JSON.parse(data);
    res.status(200).json({ message: "Events loaded successfully", events });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Failed to load events", error });
  }
};

exports.rsvpEvent = (req, res) => {
  console.log("RSVPing");
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
      res.status(200).json({ message: "User RSVPed", event });
    } else {
      res.status(200).json({ message: "User already RSVPed", event });
    }
  } catch (error) {
    res.status(500).json({ message: "RSVP failed" });
  }
};

exports.unrsvpEvent = (req, res) => {
  console.log("Un-RSVPing");
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
      res.status(200).json({ message: "User un-RSVPed", event });
    } else {
      res.status(200).json({ message: "User already un-RSVPed", event });
    }
  } catch (error) {
    res.status(500).json({ message: "Un-RSVP failed" });
  }
};
