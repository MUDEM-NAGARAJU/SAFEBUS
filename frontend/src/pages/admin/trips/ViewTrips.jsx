import { useEffect, useState } from "react";
import API from "../../../api/axios";

function ViewTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await API.get("trips/");
      setTrips(res.data?.results || res.data || []);
    } catch (err) {
      console.log("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;

  return (
    <div>
      <h2>All Trips</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus</th>
            <th>Route</th>
            <th>Date</th>
            <th>Departure</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.bus_detail?.bus_name} ({trip.bus_detail?.bus_number})</td>
              <td>
                {trip.route_detail?.source} → {trip.route_detail?.destination}
              </td>
              <td>{trip.travel_date}</td>
              <td>{trip.departure_time}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTrips;