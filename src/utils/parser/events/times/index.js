// day duration in hours start at 9 to end at 21 => 12 hours
const dayDurationInHours = 12 * 60;
// day hour start at 9 converted in minutes
const startDayHourInMinutes = 9 * 60;
// day hour finished at 21 converted in minutes
const endDayHourInMinutes = 21 * 60;

// get original and by screen start minutes
const getOriginalAndByScreenStartMinutes = (time) => {
  // split hours format HH:MM to get hours and minutes
  const [hours, minutes] = time.split(":").map((value) => parseInt(value, 10));
  const hoursInMinutes = hours * 60;
  const originalStartMinutes = hoursInMinutes + minutes;
  const startMinutes = originalStartMinutes - startDayHourInMinutes;

  return {
    originalStartMinutes,
    startMinutesByScreen: Math.round(
      (startMinutes * window.innerHeight) / dayDurationInHours
    ),
  };
};

const getEventsWithTimes = (events) =>
  events
    .reduce((acc, event) => {
      const duration = Math.round(
        (event.duration * window.innerHeight) / dayDurationInHours
      );
      const { originalStartMinutes, startMinutesByScreen } =
        getOriginalAndByScreenStartMinutes(event.start);
      const end = startMinutesByScreen + duration;
      const eventIsInSchedule =
        originalStartMinutes >= startDayHourInMinutes &&
        originalStartMinutes + event.duration <= endDayHourInMinutes;

      if (eventIsInSchedule) {
        acc.push({
          ...event,
          start: startMinutesByScreen,
          end,
          duration,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.start - b.start);

// start and end times event
const getEventsWithStartAndEndTimes = (events) => {
  const eventsWithTimes = getEventsWithTimes(events);
  return eventsWithTimes;
};

export default getEventsWithStartAndEndTimes;
