import { useEffect, useState } from "react";
import API from "../../../api/axios";

function ViewRoutes() {
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

  return (
    <div>
      <h2>All Routes</h2>

      {routes.length === 0 ? (
        <p>No routes available.</p>
      ) : (
        routes.map((route) => (
          <div
            key={route.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>
              {route.source} → {route.destination}
            </h3>

            <p>
              <strong>Distance:</strong> {route.distance} KM
            </p>

            <p>
              <strong>Estimated Duration:</strong>{" "}
              {route.estimated_duration
                ? route.estimated_duration.substring(0, 5)
                : "N/A"}
            </p>

            <p>
              <strong>Fare:</strong> ₹{route.fare}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {route.is_active ? "Active" : "Inactive"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewRoutes;