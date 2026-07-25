import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";

export default function Buses() {
  const [params] = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");

  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState("all");
  const date = params.get("date");

  useEffect(() => {
    const fetchBuses = async () => {
      const res = await API.get(`buses/?from=${from}&to=${to}&date=${date}`);
      setBuses(res.data.results || []);
    };

    fetchBuses();
  }, [from, to]);

  // FILTER LOGIC
  const filtered = buses
    .filter((bus) => {
      if (filter === "ac") return bus.ac === true;
      if (filter === "nonac") return bus.ac === false;
      return true;
    })
    .sort((a, b) => {
      if (filter === "low") return a.price - b.price;
      if (filter === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <h2>Available Buses</h2>

      {/* FILTERS */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("ac")}>AC</button>
        <button onClick={() => setFilter("nonac")}>NON-AC</button>
        <button onClick={() => setFilter("low")}>Price Low → High</button>
        <button onClick={() => setFilter("high")}>Price High → Low</button>
      </div>

      {/* RESULTS */}
      {filtered.map((bus) => (
        <div key={bus.id}>
          <h3>{bus.name}</h3>
          <p>Price: ₹{bus.price}</p>
          <p>{bus.ac ? "AC" : "NON-AC"}</p>
        </div>
      ))}
    </div>
  );
}