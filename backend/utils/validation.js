// Validation utility for event data

function validateEvent(data) {
  const errors = [];

  // Validate title
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("Title is required and must be a non-empty string");
  }

  // Validate startTime
  if (!data.startTime) {
    errors.push("Start time is required");
  } else if (isNaN(new Date(data.startTime).getTime())) {
    errors.push("Start time must be a valid date");
  }

  // Validate endTime
  if (!data.endTime) {
    errors.push("End time is required");
  } else if (isNaN(new Date(data.endTime).getTime())) {
    errors.push("End time must be a valid date");
  }

  // Validate time range
  if (data.startTime && data.endTime) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    if (start >= end) {
      errors.push("End time must be after start time");
    }
  }

  // Validate description if provided
  if (data.description && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validateEvent };
