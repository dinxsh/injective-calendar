import { type CalendarEvent, type Calendar } from "./types"

// Import JSON data
import eventsData from "./data/events.json"
import eventDatesData from "./data/event-dates.json"
import calendarsData from "./data/calendars.json"

// Convert JSON events to CalendarEvent objects with proper Date objects
// Always use current month and year, but preserve day and time from JSON
type EventObject = {
  id: unknown;
  title: unknown;
  date: unknown;
  time: unknown;
  duration: unknown;
  type: unknown;
  attendees: unknown;
  location: unknown;
  color: unknown;
  description?: unknown;
};

function isEventObject(event: unknown): event is {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  attendees: string[];
  location: string;
  color: string;
  description?: string;
} {
  if (typeof event !== 'object' || event === null) return false;
  const e = event as EventObject;
  return (
    typeof e.id === 'number' &&
    typeof e.title === 'string' &&
    typeof e.date === 'string' &&
    typeof e.time === 'string' &&
    typeof e.duration === 'string' &&
    typeof e.type === 'string' &&
    Array.isArray(e.attendees) &&
    typeof e.location === 'string' &&
    typeof e.color === 'string'
  );
}

export const events: CalendarEvent[] = (eventsData.filter(isEventObject) as Array<{
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  attendees: string[];
  location: string;
  color: string;
  description?: string;
}>).map(event => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const dayAndTime = event.date.split('T');
  const day = parseInt(dayAndTime[0]);
  const timeStr = dayAndTime[1];
  const timeParts = timeStr.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const eventDate = new Date(currentYear, currentMonth, day, hours, minutes);

  return {
    id: event.id,
    title: event.title,
    date: eventDate,
    time: event.time,
    duration: event.duration,
    type: event.type as "meeting" | "event" | "personal" | "task" | "reminder",
    attendees: event.attendees,
    location: event.location,
    color: event.color,
    description: event.description
  };
});

// Convert event dates for calendar picker - also use current month/year
export const eventDates = eventDatesData.map(item => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Parse day from date string
  const day = parseInt(item.date.split('T')[0])
  const eventDate = new Date(currentYear, currentMonth, day)

  return {
    date: eventDate,
    count: item.count
  }
})

// Calendars data
export const calendars: Calendar[] = calendarsData as Calendar[]

// Export individual collections for convenience
export { eventsData, eventDatesData, calendarsData }
