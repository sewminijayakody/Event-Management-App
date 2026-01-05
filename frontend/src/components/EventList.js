import { useState } from "react";
import api from "../api";

function EventList({ events, onEventsChange }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setLoading(true);
        await api.delete(`/${id}`);
        onEventsChange();
      } catch (error) {
        alert("Failed to delete event");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEditData({
      title: event.title,
      description: event.description || "",
      startTime: new Date(event.startTime).toISOString().slice(0, 16),
      endTime: new Date(event.endTime).toISOString().slice(0, 16),
    });
  };

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      await api.put(`/${id}`, {
        title: editData.title,
        description: editData.description,
        startTime: new Date(editData.startTime).toISOString(),
        endTime: new Date(editData.endTime).toISOString(),
      });
      setEditingId(null);
      onEventsChange();
    } catch (error) {
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (events.length === 0) {
    return <p>No events yet. Create one to get started!</p>;
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Events List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li
            key={event._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          >
            {editingId === event._id ? (
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Title: </label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Start Time: </label>
                  <input
                    type="datetime-local"
                    value={editData.startTime}
                    onChange={(e) =>
                      setEditData({ ...editData, startTime: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>End Time: </label>
                  <input
                    type="datetime-local"
                    value={editData.endTime}
                    onChange={(e) =>
                      setEditData({ ...editData, endTime: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Description: </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    rows="2"
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleUpdate(event._id)}
                    disabled={loading}
                    style={{ marginRight: "10px" }}
                  >
                    Save
                  </button>
                  <button onClick={handleCancel} disabled={loading}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3>{event.title}</h3>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(event.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {new Date(event.endTime).toLocaleString()}
                </p>
                {event.description && (
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                )}
                <div>
                  <button
                    onClick={() => handleEdit(event)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    style={{ backgroundColor: "#ff6b6b", color: "white" }}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
