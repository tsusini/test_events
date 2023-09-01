import getEventsGroups from "./groups";
import getEventsWithStartAndEndTimes from "./times";

// parse events to display in calendar
const parsedEvents = (events) => {
  const eventsWithTimes = getEventsWithStartAndEndTimes(events);
  const eventsGroupped = getEventsGroups(eventsWithTimes);
  return eventsGroupped;
};
export default parsedEvents;
