import { useEffect, useState } from "react";
import API from "../../../api/axios";

function UpdateBus() {
  const [buses, setBuses] = useState([]);

  const [form, setForm] = useState({
    id: "",
    bus_name: "",
    bus_number: "",
    bus_type: "SEATER",
    ac_type: "AC",
    total_seats: "",
  });

  // Load buses
  const fetchBuses = async () => {
    try {
      const res = await API.get("buses/");
      setBuses(res.data?.results || res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Select bus for editing
  const handleSelect = (bus) => {
    setForm({
      id: bus.id,
      bus_name: bus.bus_name,
      bus_number: bus.bus_number,
      bus_type: bus.bus_type,
      ac_type: bus.ac_type,
      total_seats: bus.total_seats,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Update API
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`buses/${form.id}/`, {
        bus_name: form.bus_name,
        bus_number: form.bus_number.toUpperCase(),
        bus_type: form.bus_type,
        ac_type: form.ac_type,
        total_seats: Number(form.total_seats),
      });

      alert("Bus updated successfully!");
      fetchBuses();
      setForm({
        id: "",
        bus_name: "",
        bus_number: "",
        bus_type: "SEATER",
        ac_type: "AC",
        total_seats: "",
      });
    } catch (err) {
      console.log("Update error:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Update Bus</h2>

      {/* LIST OF BUSES */}
      <h3>Select Bus</h3>

      {buses.map((b) => (
        <div
          key={b.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <span>
            {b.bus_name} ({b.bus_number}) - {b.bus_type} - {b.ac_type}
          </span>

          <button onClick={() => handleSelect(b)}>Edit</button>
        </div>
      ))}

      {/* EDIT FORM */}
      {form.id && (
        <form onSubmit={handleUpdate}>
          <h3>Editing Bus ID: {form.id}</h3>

          <input
            type="text"
            name="bus_name"
            value={form.bus_name}
            onChange={handleChange}
            placeholder="Bus Name"
          />

          <input
            type="text"
            name="bus_number"
            value={form.bus_number}
            onChange={handleChange}
            placeholder="Bus Number"
          />

          {/* BUS TYPE */}
          <select
            name="bus_type"
            value={form.bus_type}
            onChange={handleChange}
          >
            <option value="SEATER">Seater</option>
            <option value="SLEEPER">Sleeper</option>
            <option value="SEATER_SLEEPER">Seater & Sleeper</option>
          </select>

          {/* AC TYPE */}
          <select
            name="ac_type"
            value={form.ac_type}
            onChange={handleChange}
          >
            <option value="AC">AC</option>
            <option value="NON_AC">Non AC</option>
          </select>

          <input
            type="number"
            name="total_seats"
            value={form.total_seats}
            onChange={handleChange}
            placeholder="Total Seats"
          />

          <button type="submit">Update Bus</button>
        </form>
      )}
    </div>
  );
}

export default UpdateBus;