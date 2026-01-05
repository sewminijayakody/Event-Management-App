const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Event = require("../models/Event");

describe("Events API", () => {
  beforeAll(async () => {

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGO_URI || "mongodb://localhost:27017/event-test"
      );
    }
  });

  afterEach(async () => {
    
    await Event.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api/events", () => {
    test("Should return empty array when no events exist", async () => {
      const res = await request(app).get("/api/events");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test("Should return list of events", async () => {
      const event = await Event.create({
        title: "Test Event",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      const res = await request(app).get("/api/events");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe("Test Event");
    });
  });

  describe("POST /api/events", () => {
    test("Should create a new event", async () => {
      const newEvent = {
        title: "New Event",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
        description: "Test description",
      };

      const res = await request(app).post("/api/events").send(newEvent);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("New Event");
      expect(res.body._id).toBeDefined();
    });

    test("Should fail with missing title", async () => {
      const invalidEvent = {
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      };

      const res = await request(app).post("/api/events").send(invalidEvent);

      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    test("Should fail with invalid time range", async () => {
      const invalidEvent = {
        title: "Event",
        startTime: new Date("2026-01-15 11:00"),
        endTime: new Date("2026-01-15 10:00"),
      };

      const res = await request(app).post("/api/events").send(invalidEvent);

      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe("GET /api/events/:id", () => {
    test("Should return a single event", async () => {
      const event = await Event.create({
        title: "Single Event",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      const res = await request(app).get(`/api/events/${event._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Single Event");
    });

    test("Should return 404 for non-existent event", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/events/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("PUT /api/events/:id", () => {
    test("Should update an event", async () => {
      const event = await Event.create({
        title: "Original Title",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      const res = await request(app)
        .put(`/api/events/${event._id}`)
        .send({ title: "Updated Title" });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Updated Title");
    });

    test("Should return 404 for non-existent event", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app)
        .put(`/api/events/${fakeId}`)
        .send({ title: "Updated Title" });

      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/events/:id", () => {
    test("Should delete an event", async () => {
      const event = await Event.create({
        title: "Event to Delete",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      const res = await request(app).delete(`/api/events/${event._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Event deleted successfully");

      const deletedEvent = await Event.findById(event._id);
      expect(deletedEvent).toBeNull();
    });

    test("Should return 404 for non-existent event", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).delete(`/api/events/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /api/events/overlaps", () => {
    test("Should return empty array when no overlaps", async () => {
      await Event.create({
        title: "Event A",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      await Event.create({
        title: "Event B",
        startTime: new Date("2026-01-15 12:00"),
        endTime: new Date("2026-01-15 13:00"),
      });

      const res = await request(app).get("/api/events/overlaps");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test("Should detect overlapping events", async () => {
      await Event.create({
        title: "Event A",
        startTime: new Date("2026-01-15 10:00"),
        endTime: new Date("2026-01-15 11:00"),
      });

      await Event.create({
        title: "Event B",
        startTime: new Date("2026-01-15 10:30"),
        endTime: new Date("2026-01-15 11:30"),
      });

      const res = await request(app).get("/api/events/overlaps");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
