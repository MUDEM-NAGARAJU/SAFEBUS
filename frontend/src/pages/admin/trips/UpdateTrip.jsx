import { useEffect, useState } from "react";
import API from "../../../api/axios";

function UpdateTrip() {
  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    id: "",
    bus: "",
    route: "",
    travel_date: "",
    price: "",
    available_seats: "",
  });

  // Load all trips
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

  // When admin selects a trip
  const handleSelect = (trip) => {
    setForm({
      id: trip.id,
      bus: trip.bus.id,
      route: trip.route.id,
      travel_date: trip.travel_date,
      price: trip.price,
      available_seats: trip.available_seats,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update API call
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`trips/${form.id}/`, {
        bus: form.bus,
        route: form.route,
        travel_date: form.travel_date,
        price: form.price,
        available_seats: form.available_seats,
      });

      alert("Trip updated successfully!");
      fetchTrips();
    } catch (err) {
      console.log("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Update Trip</h2>

      {/* TRIP LIST */}
      <h3>Select Trip</h3>
      {trips.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <span>
            {t.route?.source} → {t.route?.destination} | {t.travel_date}
          </span>
          <button onClick={() => handleSelect(t)}>Edit</button>
        </div>
      ))}

      {/* EDIT FORM */}
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

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="available_seats"
            value={form.available_seats}
            onChange={handleChange}
          />

          <button type="submit">Update Trip</button>
        </form>
      )}
    </div>
  );
}

export default UpdateTrip;