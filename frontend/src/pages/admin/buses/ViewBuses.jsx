import { useEffect, useState } from "react";
import API from "../../../api/axios";

function ViewBuses() {
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

  return (
    <div>
      <h2>All Buses</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus Name</th>
            <th>Bus Number</th>
            <th>Seating_type</th>
            <th>AC_type</th>
            <th>Capacity</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.bus_name}</td>
              <td>{b.bus_number}</td>
              <td>{b.bus_type}</td>
              <td>{b.ac_type}</td>
              <td>{b.total_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBuses;