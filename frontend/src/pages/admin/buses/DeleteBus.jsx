import { useEffect, useState } from "react";
import API from "../../../api/axios";

function DeleteBus() {
  const [buses, setBuses] = useState([]);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`buses/${id}/`);
      alert("Bus deleted successfully!");
      fetchBuses();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete bus");
    }
  };

  return (
    <div>
      <h2>Delete Buses</h2>

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
            {b.bus_name} ({b.bus_number}) | Seats: {b.total_seats}
          </span>

          <button
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
            onClick={() => handleDelete(b.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DeleteBus;