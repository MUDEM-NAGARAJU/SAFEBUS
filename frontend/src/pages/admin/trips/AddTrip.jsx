import { useEffect, useState } from "react";
import API from "../../../api/axios";

function AddTrip() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [form, setForm] = useState({
    bus: "",
    route: "",
    travel_date: "",
    price: "",
    available_seats: "",
  });

  // Load buses + routes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const busRes = await API.get("buses/");
        const routeRes = await API.get("routes/");
        setBuses(busRes.data?.results || busRes.data || []);
        setRoutes(routeRes.data?.results || routeRes.data || []);

      } catch (err) {
        console.log("Error loading data", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("trips/", form);
      alert("Trip added successfully!");

      // reset form
      setForm({
        bus: "",
        route: "",
        travel_date: "",
        price: "",
        available_seats: "",
      });
    } catch (err) {
      console.log("Error adding trip", err);
      alert("Failed to add trip");
    }
  };

  return (
    <div>
      <h2>Add Trip</h2>

      <form onSubmit={handleSubmit}>

        {/* BUS */}
        <select
          name="bus"
          value={form.bus}
          onChange={handleChange}
          required
        >
          <option value="">Select Bus</option>
          {buses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.bus_name}
            </option>
          ))}
        </select>

        {/* ROUTE */}
        <select
          name="route"
          value={form.route}
          onChange={handleChange}
          required
        >
          <option value="">Select Route</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.source} → {r.destination}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          name="travel_date"
          value={form.travel_date}
          onChange={handleChange}
          required
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* SEATS */}
        <input
          type="number"
          name="available_seats"
          placeholder="Seats"
          value={form.available_seats}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}

export default AddTrip;