import { useState } from "react";
import API from "../../../api/axios";

function AddRoute() {
  const [routeForm, setRouteForm] = useState({
    source: "",
    destination: "",
    distance: "",
    estimated_duration: "",
  });

  const [stops, setStops] = useState([
    { stop_name: "", distance_from_origin_km: "", arrival_offset_minutes: "", seater_fare: "", sleeper_fare: "" },
  ]);

  const handleRouteChange = (e) => {
    setRouteForm({ ...routeForm, [e.target.name]: e.target.value });
  };

  const handleStopChange = (index, e) => {
    const updated = [...stops];
    updated[index][e.target.name] = e.target.value;
    setStops(updated);
  };

  const addStopRow = () => {
    setStops([...stops, { stop_name: "", distance_from_origin_km: "", arrival_offset_minutes: "", seater_fare: "", sleeper_fare: "" }]);
  };

  const removeStopRow = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Create the route
      const routeRes = await API.post("routes/", {
        source: routeForm.source.toUpperCase(),
        destination: routeForm.destination.toUpperCase(),
        distance: Number(routeForm.distance),
        estimated_duration: `${routeForm.estimated_duration}:00`,
      });
      const routeId = routeRes.data.id;

      // 2. Create each stop in order, then its fare
      for (let i = 0; i < stops.length; i++) {
        const s = stops[i];
        const stopRes = await API.post("route-stops/", {
          route: routeId,
          stop_name: s.stop_name,
          sequence: i + 1,
          distance_from_origin_km: Number(s.distance_from_origin_km) || 0,
          arrival_offset_minutes: Number(s.arrival_offset_minutes) || 0,
        });

        await API.post("stop-fares/", {
          route_stop: stopRes.data.id,
          seater_fare: Number(s.seater_fare) || 0,
          sleeper_fare: Number(s.sleeper_fare) || 0,
        });
      }

      alert("Route with stops and fares added successfully!");
      setRouteForm({ source: "", destination: "", distance: "", estimated_duration: "" });
      setStops([{ stop_name: "", distance_from_origin_km: "", arrival_offset_minutes: "", seater_fare: "", sleeper_fare: "" }]);
    } catch (err) {
      console.log("Error adding route:", err.response?.data);
      alert("Failed: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Add Route</h2>

      <form onSubmit={handleSubmit}>
        <h3>Route Info</h3>
        <input type="text" name="source" placeholder="Source" value={routeForm.source} onChange={handleRouteChange} required />
        <input type="text" name="destination" placeholder="Destination" value={routeForm.destination} onChange={handleRouteChange} required />
        <input type="number" name="distance" placeholder="Total Distance (KM)" value={routeForm.distance} onChange={handleRouteChange} required />
        <label>Estimated Duration</label>
        <input type="time" name="estimated_duration" value={routeForm.estimated_duration} onChange={handleRouteChange} required />

        <h3>Stops (in travel order — fares are cumulative from the first stop)</h3>
        {stops.map((stop, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 6 }}>
            <p><b>Stop {index + 1}</b></p>
            <input
              type="text" name="stop_name" placeholder="Stop name"
              value={stop.stop_name} onChange={(e) => handleStopChange(index, e)} required
            />
            <input
              type="number" name="distance_from_origin_km" placeholder="Distance from origin (KM)"
              value={stop.distance_from_origin_km} onChange={(e) => handleStopChange(index, e)}
            />
            <input
              type="number" name="arrival_offset_minutes" placeholder="Minutes after departure"
              value={stop.arrival_offset_minutes} onChange={(e) => handleStopChange(index, e)}
            />
            <input
              type="number" step="0.01" name="seater_fare" placeholder="Cumulative Seater Fare (₹)"
              value={stop.seater_fare} onChange={(e) => handleStopChange(index, e)} required
            />
            <input
              type="number" step="0.01" name="sleeper_fare" placeholder="Cumulative Sleeper Fare (₹)"
              value={stop.sleeper_fare} onChange={(e) => handleStopChange(index, e)} required
            />
            {stops.length > 1 && (
              <button type="button" onClick={() => removeStopRow(index)}>Remove Stop</button>
            )}
          </div>
        ))}

        <button type="button" onClick={addStopRow}>+ Add Another Stop</button>
        <br /><br />
        <button type="submit">Save Route</button>
      </form>
    </div>
  );
}

export default AddRoute;