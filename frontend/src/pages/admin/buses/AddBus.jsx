import { useState } from "react";
import API from "../../../api/axios";

function AddBus() {
  const [form, setForm] = useState({
    bus_name: "",
    bus_number: "",
    bus_type: "SEATER",
    ac_type: "AC",
    total_seats: "",
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
      await API.post("buses/", {
        bus_name: form.bus_name,
        bus_number: form.bus_number.toUpperCase(),
        bus_type: form.bus_type,
        ac_type: form.ac_type,
        total_seats: Number(form.total_seats),
      });

      alert("Bus added successfully!");

      setForm({
        bus_name: "",
        bus_number: "",
        bus_type: "SEATER",
        ac_type: "AC",
        total_seats: "",
      });
    } catch (err) {
      console.log("Error adding bus:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Add Bus</h2>

      <form onSubmit={handleSubmit}>
        {/* BUS NAME */}
        <input
          type="text"
          name="bus_name"
          placeholder="Bus Name"
          value={form.bus_name}
          onChange={handleChange}
          required
        />

        {/* BUS NUMBER */}
        <input
          type="text"
          name="bus_number"
          placeholder="Bus Number"
          value={form.bus_number}
          onChange={handleChange}
          required
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

        {/* TOTAL SEATS */}
        <input
          type="number"
          name="total_seats"
          placeholder="Total Seats"
          value={form.total_seats}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBus;