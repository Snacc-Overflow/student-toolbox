let eventGuid = 0;

export const EVENTS = [];

export function createEventId() {
  return String(eventGuid++);
}
