const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventController");

router.post("/", controller.createEvent);
router.get("/", controller.getEvents);
router.get("/overlaps", controller.getOverlaps);
router.get("/:id", controller.getEvent);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;
