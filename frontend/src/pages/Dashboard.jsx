import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await API.get("buses/");
        setBuses(res.data?.results || []);
      } catch (err) {
        console.log(err.response?.data);
        setError("Failed to load buses");
      }
    };

    fetchBuses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚍 Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {buses.length === 0 ? (
        <p>No buses available</p>
      ) : (
        buses.map((bus) => (
          <div
            key={bus.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{bus.name || "Bus"}</h3>
            <p>Number: {bus.bus_number}</p>
            <p>Type: {bus.type}</p>
          </div>
        ))
      )}
    </div>
  );
}