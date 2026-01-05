const Event = require("../models/Event");
const { findOverlaps } = require("../utils/overlapAlgorithm");
const { validateEvent } = require("../utils/validation");

exports.createEvent = async (req, res) => {
  try {
    // Validate input
    const validation = validateEvent(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
   
    if (req.body.startTime || req.body.endTime) {
      const validation = validateEvent({
        ...req.body,
        title: req.body.title || "placeholder",
      });
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }
    }

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

exports.getOverlaps = async (req, res) => {
  try {
    const events = await Event.find();
    const result = findOverlaps(events);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get overlaps error:", error);
    res.status(500).json({ error: "Failed to calculate overlaps" });
  }
};
