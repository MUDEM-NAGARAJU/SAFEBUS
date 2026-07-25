import { useState } from "react";
import API from "../../../api/axios";

function AddRoute() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    distance: "",
    estimated_duration: "",
    fare: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("routes/", {
        source: form.source.toUpperCase(),
        destination: form.destination.toUpperCase(),
        distance: Number(form.distance),
        estimated_duration: `${form.estimated_duration}:00`,
        fare: Number(form.fare),
      });

      alert("Route added successfully!");

      setForm({
        source: "",
        destination: "",
        distance: "",
        estimated_duration: "",
        fare: "",
      });
    } catch (err) {
      console.log("Error adding route:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Add Route</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="distance"
          placeholder="Distance (KM)"
          value={form.distance}
          onChange={handleChange}
          required
        />

        <label>Estimated Duration</label>
        <input
          type="time"
          name="estimated_duration"
          value={form.estimated_duration}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="fare"
          placeholder="Fare"
          value={form.fare}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Route</button>

      </form>
    </div>
  );
}

export default AddRoute;