import data from "./data/events.json";
import parsedEvents from "./utils/parser/events";

function App() {
  const events = parsedEvents(data);
  return (
    <div className="min-h-screen">
      <div className="h-screen relative bg-neutral-200">
        {events.map((event, index) => (
          <div key={`events-${index}`}>
            {event.map(({ start, duration, id, width, left }) => (
              <div
                key={`event-${id}`}
                className="absolute 
                border-black
                bg-white
                border
                flex
                rounded
                justify-center
                shadow
                items-center"
                style={{
                  top: `${start}px`,
                  height: `${duration}px`,
                  width: `${width}%`,
                  left: `${left}%`,
                }}
              >
                <p className="text-xs  md:text-xl bold">{id}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
