import { useEffect, useState } from "react";
import api from "./api";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Overlaps from "./components/Overlaps";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>📅 Event Management Application</h1>

      <EventForm onEventAdded={loadEvents} />

      {loading && <p>Loading events...</p>}

      {!loading && <EventList events={events} onEventsChange={loadEvents} />}

      {!loading && <Overlaps />}
    </div>
  );
}

export default App;
