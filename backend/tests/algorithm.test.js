const { findOverlaps } = require("../utils/overlapAlgorithm");

describe("findOverlaps Algorithm", () => {
  test("Detect overlapping events", () => {
    const events = [
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 10:00"),
      },
      {
        title: "B",
        startTime: new Date("2026-01-01 09:30"),
        endTime: new Date("2026-01-01 11:00"),
      },
    ];

    const result = findOverlaps(events);
    expect(result.length).toBe(1);
    expect(result[0].event1).toBe("A");
    expect(result[0].event2).toBe("B");
  });

  test("Handle non-overlapping events", () => {
    const events = [
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 10:00"),
      },
      {
        title: "B",
        startTime: new Date("2026-01-01 11:00"),
        endTime: new Date("2026-01-01 12:00"),
      },
    ];

    const result = findOverlaps(events);
    expect(result.length).toBe(0);
  });

  test("Handle multiple overlaps", () => {
    const events = [
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 11:00"),
      },
      {
        title: "B",
        startTime: new Date("2026-01-01 09:30"),
        endTime: new Date("2026-01-01 10:30"),
      },
      {
        title: "C",
        startTime: new Date("2026-01-01 10:00"),
        endTime: new Date("2026-01-01 12:00"),
      },
    ];

    const result = findOverlaps(events);
    expect(result.length).toBeGreaterThan(0);
  });

  test("Handle empty event list", () => {
    const events = [];
    const result = findOverlaps(events);
    expect(result).toEqual([]);
  });

  test("Handle single event", () => {
    const events = [
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 10:00"),
      },
    ];

    const result = findOverlaps(events);
    expect(result).toEqual([]);
  });

  test("Handle events with same end and start times (boundary)", () => {
    const events = [
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 10:00"),
      },
      {
        title: "B",
        startTime: new Date("2026-01-01 10:00"),
        endTime: new Date("2026-01-01 11:00"),
      },
    ];

    const result = findOverlaps(events);

    expect(result.length).toBe(0);
  });

  test("Handle unsorted events", () => {
    const events = [
      {
        title: "B",
        startTime: new Date("2026-01-01 09:30"),
        endTime: new Date("2026-01-01 11:00"),
      },
      {
        title: "A",
        startTime: new Date("2026-01-01 09:00"),
        endTime: new Date("2026-01-01 10:00"),
      },
    ];

    const result = findOverlaps(events);
    expect(result.length).toBe(1);
  });
});
