// hasOverlapping function is used to check if an event overlaps with another event in the same group.
const hasOverlapping = ({ eventsGroup, event }) =>
  eventsGroup.some((a) => a.end > event.start && a.start < event.end);

//Groups events based on overlapping.
const getEventsGroupByOverlapping = (events) =>
  events.reduce((acc, event) => {
    if (acc.some((eventsGroup) => hasOverlapping({ eventsGroup, event }))) {
      const index = acc.findIndex((eventsGroup) =>
        hasOverlapping({ eventsGroup, event })
      );
      acc[index].push(event);
    } else {
      acc.push([event]);
    }

    return acc;
  }, []);

const groupEventsWithPosition = (events) =>
  events.map((eventsGroup) => {
    let column = eventsGroup.length;

    return eventsGroup.map((event, index) => {
      // set base left and width for every event
      const width = 100 / eventsGroup.length;
      const left = index === 0 ? 0 : width * index;
      event.width = width;
      event.left = left;

      const moreThanTwoEvents = eventsGroup.length > 2;

      if (moreThanTwoEvents) {
        eventsGroup.forEach((eventToCheck) => {
          const prevPosition = Math.abs(event.left - event.width);

          if (event.start >= eventToCheck.end && !event.hasMoved) {
            const eventsOnSamePosition = eventsGroup.filter(
              (app) => app.left === eventToCheck.left
            );
            if (
              !eventsOnSamePosition.some(
                (eventOnSamePosition) => eventOnSamePosition.end > event.start
              )
            ) {
              event.left = eventToCheck.left;
              event.hasMoved = true;
              column -= 1;
            } else if (
              !eventsGroup.some((e) => e.left === prevPosition) &&
              !event.hasMoved
            ) {
              event.left = prevPosition;
            }
          }
        });

        // check if we are at the last element of overlapping group for re compute width and left for each
        if (eventsGroup.length === index + 1 && moreThanTwoEvents) {
          eventsGroup.forEach((e) => {
            const prevWidth = e.width;
            const prevLeft = e.left;
            const newWidth = 100 / column;

            e.width = newWidth;
            e.left = (newWidth * prevLeft) / prevWidth;
          });
        }
      }
      return event;
    });
  });

const getEventsGroups = (events) => {
  const parsedEvents = getEventsGroupByOverlapping(events);
  const eventsWithPosition = groupEventsWithPosition(parsedEvents);
  return eventsWithPosition;
};

export default getEventsGroups;
