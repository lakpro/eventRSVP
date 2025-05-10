const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  rsvpEvent,
  unrsvpEvent,
} = require("../controller/eventContorller");

router.get("/", getAllEvents);
router.post("/:id/rsvp", rsvpEvent);
router.post("/:id/unrsvp", unrsvpEvent);

module.exports = router;
