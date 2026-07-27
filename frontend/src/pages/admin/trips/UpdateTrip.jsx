import { useEffect, useState } from "react";
import API from "../../../api/axios";

function UpdateTrip() {
  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    id: "",
    bus: "",
    route: "",
    travel_date: "",
    departure_time: "",
  });

  const fetchTrips = async () => {
    try {
      const res = await API.get("trips/");
      setTrips(res.data?.results || res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleSelect = (trip) => {
    setForm({
      id: trip.id,
      bus: trip.bus,
      route: trip.route,
      travel_date: trip.travel_date,
      departure_time: trip.departure_time,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`trips/${form.id}/`, {
        bus: form.bus,
        route: form.route,
        travel_date: form.travel_date,
        departure_time: form.departure_time,
      });

      alert("Trip updated successfully!");
      fetchTrips();
    } catch (err) {
      console.log("Update error:", err.response?.data);
      alert("Update failed: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Update Trip</h2>

      <h3>Select Trip</h3>
      {trips.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <span>
            {t.route_detail?.source} → {t.route_detail?.destination} | {t.travel_date}
          </span>
          <button onClick={() => handleSelect(t)}>Edit</button>
        </div>
      ))}

      {form.id && (
        <form onSubmit={handleUpdate}>
          <h3>Editing Trip ID: {form.id}</h3>

          <input
            type="number"
            name="bus"
            value={form.bus}
            onChange={handleChange}
            placeholder="Bus ID"
          />

          <input
            type="number"
            name="route"
            value={form.route}
            onChange={handleChange}
            placeholder="Route ID"
          />

          <input
            type="date"
            name="travel_date"
            value={form.travel_date}
            onChange={handleChange}
          />

          <label>Departure Time</label>
          <input
            type="time"
            name="departure_time"
            value={form.departure_time}
            onChange={handleChange}
          />

          <button type="submit">Update Trip</button>
        </form>
      )}
    </div>
  );
}

export default UpdateTrip;