import { useEffect, useState } from "react";
import API from "../../../api/axios";

function DeleteTrip() {
  const [trips, setTrips] = useState([]);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`trips/${id}/`);
      alert("Trip deleted successfully!");
      fetchTrips();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Delete Trips</h2>

      {trips.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <span>
            {t.route_detail?.source} → {t.route_detail?.destination} | {t.travel_date}
          </span>

          <button
            style={{ background: "red", color: "white" }}
            onClick={() => handleDelete(t.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DeleteTrip;