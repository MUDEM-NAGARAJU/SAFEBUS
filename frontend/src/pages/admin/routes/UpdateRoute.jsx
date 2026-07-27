import { useEffect, useState } from "react";
import API from "../../../api/axios";

function UpdateRoute() {
  const [routes, setRoutes] = useState([]);

  const [form, setForm] = useState({
    id: "",
    source: "",
    destination: "",
    distance: "",
    estimated_duration: "",
  });

  const fetchRoutes = async () => {
    try {
      const res = await API.get("routes/");
      setRoutes(res.data?.results || res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSelect = (route) => {
    setForm({
      id: route.id,
      source: route.source,
      destination: route.destination,
      distance: route.distance,
      estimated_duration: route.estimated_duration
        ? route.estimated_duration.substring(0, 5)
        : "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`routes/${form.id}/`, {
        source: form.source.toUpperCase(),
        destination: form.destination.toUpperCase(),
        distance: Number(form.distance),
        estimated_duration: `${form.estimated_duration}:00`,
        is_active: true,
      });

      alert("Route updated successfully!");
      fetchRoutes();

      setForm({
        id: "",
        source: "",
        destination: "",
        distance: "",
        estimated_duration: "",
      });
    } catch (err) {
      console.log("Update Error:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Update Route</h2>

      {routes.map((route) => (
        <div
          key={route.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <span>
            <strong>
              {route.source} → {route.destination}
            </strong>
            <br />
            {route.distance} KM | {route.estimated_duration}
          </span>

          <button onClick={() => handleSelect(route)}>Edit</button>
        </div>
      ))}

      {form.id && (
        <form onSubmit={handleUpdate}>
          <h3>Editing Route #{form.id}</h3>

          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Source"
            required
          />

          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
          />

          <input
            type="number"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            placeholder="Distance (KM)"
            required
          />

          <input
            type="time"
            name="estimated_duration"
            value={form.estimated_duration}
            onChange={handleChange}
            required
          />

          <button type="submit">Update Route</button>
        </form>
      )}
    </div>
  );
}

export default UpdateRoute;