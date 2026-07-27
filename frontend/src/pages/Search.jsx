import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function useStopSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await API.get(`route-stops/?search=${query}`);
        const names = [...new Set((res.data.results || []).map((s) => s.stop_name))];
        setSuggestions(names.slice(0, 6));
      } catch {
        setSuggestions([]);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  return suggestions;
}

function AutocompleteInput({ placeholder, value, onChange }) {
  const [showList, setShowList] = useState(false);
  const suggestions = useStopSuggestions(value);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
      />
      {showList && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "white", border: "1px solid #ccc", borderRadius: 4,
          zIndex: 10, maxHeight: 180, overflowY: "auto",
        }}>
          {suggestions.map((name) => (
            <div
              key={name}
              onClick={() => { onChange(name); setShowList(false); }}
              style={{ padding: 8, cursor: "pointer" }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Search() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill From, To, and Date");
      return;
    }
    navigate(`/buses?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="search-container" style={{ padding: 40, maxWidth: 500, margin: "0 auto" }}>
      <h2>Search Buses</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AutocompleteInput placeholder="From" value={from} onChange={setFrom} />
        <AutocompleteInput placeholder="To" value={to} onChange={setTo} />

        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSearch} style={{ padding: 10, cursor: "pointer" }}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;