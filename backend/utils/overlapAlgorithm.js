function findOverlaps(events) {
  events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const overlaps = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (events[i].endTime > events[j].startTime) {
        overlaps.push({
          event1: events[i].title,
          event2: events[j].title
        });
      } else {
        break;
      }
    }
  }

  return overlaps;
}

module.exports = { findOverlaps };
