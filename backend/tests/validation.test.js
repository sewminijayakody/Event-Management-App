const { validateEvent } = require("../utils/validation");

describe("Event Validation", () => {
  test("Valid event passes validation", () => {
    const validEvent = {
      title: "Meeting",
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
      description: "Team meeting",
    };

    const result = validateEvent(validEvent);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("Missing title fails validation", () => {
    const invalidEvent = {
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("Title"))).toBe(true);
  });

  test("Empty title fails validation", () => {
    const invalidEvent = {
      title: "   ",
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("Title"))).toBe(true);
  });

  test("Missing start time fails validation", () => {
    const invalidEvent = {
      title: "Meeting",
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("Start time"))).toBe(true);
  });

  test("Missing end time fails validation", () => {
    const invalidEvent = {
      title: "Meeting",
      startTime: new Date("2026-01-15 10:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("End time"))).toBe(true);
  });

  test("Invalid start time format fails validation", () => {
    const invalidEvent = {
      title: "Meeting",
      startTime: "not-a-date",
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("valid date"))).toBe(true);
  });

  test("End time before start time fails validation", () => {
    const invalidEvent = {
      title: "Meeting",
      startTime: new Date("2026-01-15 11:00"),
      endTime: new Date("2026-01-15 10:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("End time must be after"))
    ).toBe(true);
  });

  test("Same start and end time fails validation", () => {
    const sameTime = new Date("2026-01-15 10:00");
    const invalidEvent = {
      title: "Meeting",
      startTime: sameTime,
      endTime: sameTime,
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("End time must be after"))
    ).toBe(true);
  });

  test("Non-string title fails validation", () => {
    const invalidEvent = {
      title: 123,
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("Title"))).toBe(true);
  });

  test("Non-string description fails validation", () => {
    const invalidEvent = {
      title: "Meeting",
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
      description: 123,
    };

    const result = validateEvent(invalidEvent);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("Description"))).toBe(true);
  });

  test("Valid event without description passes validation", () => {
    const validEvent = {
      title: "Meeting",
      startTime: new Date("2026-01-15 10:00"),
      endTime: new Date("2026-01-15 11:00"),
    };

    const result = validateEvent(validEvent);
    expect(result.isValid).toBe(true);
  });
});
