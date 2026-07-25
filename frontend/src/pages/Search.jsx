import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    navigate(
      `/trips?from=${from}&to=${to}&date=${date}`
    );
  };

  return (
    <div className="search-container">
      <h2>Search Buses</h2>

      <input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      
      <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;