const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./model/event.model");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();

app.use(express.json());

const createEvent = async (newEvent) => {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.log(error);
  }
};

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res
      .status(201)
      .json({ message: "Event added successfully.", event: savedEvent });
  } catch {
    res.status(500).json({ error: "Failed to add event." });
  }
});

const getAllEvents = async () => {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents(req.params.events);

    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not found." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

const getEventById = async (eventId) => {
  try {
    const eventById = await Event.findById(eventId);
    return eventById;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await getEventById(req.params.eventId);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch the event." });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
