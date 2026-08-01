import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Buses() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const res = await API.get(`trips/?from=${from}&to=${to}&date=${date}`);
        setTrips(res.data.results || []);
      } catch (err) {
        console.log(err.response?.data);
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [from, to, date]);

  const filtered = trips.filter((trip) => {
    if (filter === "ac") return trip.bus_detail?.ac_type === "AC";
    if (filter === "nonac") return trip.bus_detail?.ac_type === "NON_AC";
    return true;
  });

  return (
    <div className="page">
      <h2>Trips: {from} → {to} on {date}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="admin-actions">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("ac")}>AC</button>
        <button onClick={() => setFilter("nonac")}>NON-AC</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No trips found for this route/date.</p>
      ) : (
        filtered.map((trip) => (
          <div key={trip.id} className="card">
            <h3>{trip.bus_detail?.bus_name} ({trip.bus_detail?.bus_number})</h3>
            <p>{trip.bus_detail?.bus_type} / {trip.bus_detail?.ac_type}</p>
            <p>Route: {trip.route_detail?.source} → {trip.route_detail?.destination}</p>
            <p>Date: {trip.travel_date} | Departure: {trip.departure_time}</p>
            <button className="btn" onClick={() => navigate(`/trip/${trip.id}/seats?from=${from}&to=${to}`)}>
              Select Seats
            </button>
          </div>
        ))
      )}
    </div>
  );
}