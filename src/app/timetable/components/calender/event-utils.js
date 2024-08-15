let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const EVENTS = [];

export function createEventId() {
  return String(eventGuid++);
}
