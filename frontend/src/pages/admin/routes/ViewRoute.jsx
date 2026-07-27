import { useEffect, useState } from "react";
import API from "../../../api/axios";

function ViewRoutes() {
  const [routes, setRoutes] = useState([]);
  const [stopsByRoute, setStopsByRoute] = useState({});

  const fetchRoutes = async () => {
    try {
      const res = await API.get("routes/");
      const routeList = res.data?.results || res.data || [];
      setRoutes(routeList);

      const stopsMap = {};
      for (const route of routeList) {
        const stopsRes = await API.get(`route-stops/?route=${route.id}&ordering=sequence`);
        const stopList = stopsRes.data?.results || [];

        const withFares = await Promise.all(
          stopList.map(async (stop) => {
            const fareRes = await API.get(`stop-fares/?route_stop=${stop.id}`);
            const fare = (fareRes.data?.results || [])[0];
            return { ...stop, fare };
          })
        );
        stopsMap[route.id] = withFares;
      }
      setStopsByRoute(stopsMap);
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
          <div key={route.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px", marginBottom: "15px" }}>
            <h3>{route.source} → {route.destination}</h3>
            <p><strong>Distance:</strong> {route.distance} KM</p>
            <p><strong>Estimated Duration:</strong> {route.estimated_duration ? route.estimated_duration.substring(0, 5) : "N/A"}</p>
            <p><strong>Status:</strong> {route.is_active ? "Active" : "Inactive"}</p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
              <thead>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={{ border: "1px solid #ddd", padding: 6 }}>Seq</th>
                  <th style={{ border: "1px solid #ddd", padding: 6 }}>Stop</th>
                  <th style={{ border: "1px solid #ddd", padding: 6 }}>Seater Fare</th>
                  <th style={{ border: "1px solid #ddd", padding: 6 }}>Sleeper Fare</th>
                </tr>
              </thead>
              <tbody>
                {(stopsByRoute[route.id] || []).map((stop) => (
                  <tr key={stop.id}>
                    <td style={{ border: "1px solid #ddd", padding: 6, textAlign: "center" }}>{stop.sequence}</td>
                    <td style={{ border: "1px solid #ddd", padding: 6 }}>{stop.stop_name}</td>
                    <td style={{ border: "1px solid #ddd", padding: 6, textAlign: "center" }}>₹{stop.fare?.seater_fare ?? "-"}</td>
                    <td style={{ border: "1px solid #ddd", padding: 6, textAlign: "center" }}>₹{stop.fare?.sleeper_fare ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewRoutes;