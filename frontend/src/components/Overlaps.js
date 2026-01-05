import { useState, useEffect } from "react";
import api from "../api";

function Overlaps() {
  const [overlaps, setOverlaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOverlaps = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/overlaps");
      setOverlaps(res.data);
    } catch (err) {
      setError("Failed to load overlaps");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverlaps();
  }, []);

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "4px" }}
    >
      <h2>Event Overlaps</h2>
      <button onClick={loadOverlaps} disabled={loading}>
        {loading ? "Loading..." : "Refresh Overlaps"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {overlaps.length === 0 ? (
        <p>No overlapping events found.</p>
      ) : (
        <ul>
          {overlaps.map((overlap, idx) => (
            <li key={idx}>
              <strong>{overlap.event1}</strong> overlaps with{" "}
              <strong>{overlap.event2}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Overlaps;
