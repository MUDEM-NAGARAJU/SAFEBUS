import { useEffect, useState } from "react";
import API from "../../../api/axios";

function DeleteRoute() {
  const [routes, setRoutes] = useState([]);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`routes/${id}/`);
      alert("Route deleted successfully!");
      fetchRoutes();
    } catch (err) {
      console.log("Delete Error:", err.response?.data);
      alert("Failed to delete route.");
    }
  };

  return (
    <div>
      <h2>Delete Route</h2>

      {routes.length === 0 ? (
        <p>No routes found.</p>
      ) : (
        routes.map((route) => (
          <div
            key={route.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div>
              <strong>
                {route.source} → {route.destination}
              </strong>
              <br />
              Distance: {route.distance} KM
              <br />
              Duration: {route.estimated_duration}
              <br />
              Fare: ₹{route.fare}
            </div>

            <button
              onClick={() => handleDelete(route.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteRoute;