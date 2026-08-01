import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function SeatSelection() {
  const { tripId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const fromQuery = params.get("from") || "";
  const toQuery = params.get("to") || "";

  const [stops, setStops] = useState([]);
  const [boardingStop, setBoardingStop] = useState("");
  const [droppingStop, setDroppingStop] = useState("");
  const [seats, setSeats] = useState([]);
  const [holdIds, setHoldIds] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const tripRes = await API.get(`trips/${tripId}/`);
        const routeId = tripRes.data.route;

        const stopsRes = await API.get(`route-stops/?route=${routeId}&ordering=sequence`);
        const stopList = stopsRes.data.results || [];
        setStops(stopList);

        const matchBoard = stopList.find((s) => s.stop_name.toLowerCase().includes(fromQuery.toLowerCase()));
        const matchDrop = stopList.find((s) => s.stop_name.toLowerCase().includes(toQuery.toLowerCase()));
        if (matchBoard) setBoardingStop(matchBoard.id);
        if (matchDrop) setDroppingStop(matchDrop.id);
      } catch {
        setError("Failed to load route stops");
      }
    };
    load();
  }, [tripId]);

  const loadSeatMap = useCallback(async () => {
    if (!boardingStop || !droppingStop) return;
    try {
      const res = await API.get(
        `trips/${tripId}/seat-map/?boarding_stop=${boardingStop}&dropping_stop=${droppingStop}`
      );
      setSeats(res.data.seats || []);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load seat map");
    }
  }, [tripId, boardingStop, droppingStop]);

  useEffect(() => {
    loadSeatMap();
    const interval = setInterval(loadSeatMap, 5000);
    return () => clearInterval(interval);
  }, [loadSeatMap]);

  const handleSeatClick = async (seat) => {
    if (busy) return;
    setError("");

    if (seat.status === "booked_or_held") return;

    setBusy(true);
    try {
      if (seat.status === "held_by_you") {
        const holdId = holdIds[seat.seat_id];
        if (holdId) {
          await API.delete(`seat-holds/${holdId}/`);
          setHoldIds((prev) => {
            const copy = { ...prev };
            delete copy[seat.seat_id];
            return copy;
          });
        }
      } else {
        const res = await API.post("seat-holds/", {
          trip: tripId,
          seat: seat.seat_id,
          boarding_stop: boardingStop,
          dropping_stop: droppingStop,
        });
        setHoldIds((prev) => ({ ...prev, [seat.seat_id]: res.data.id }));
      }
      await loadSeatMap();
    } catch (err) {
      setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || "Action failed");
    } finally {
      setBusy(false);
    }
  };

  const mySeats = seats.filter((s) => s.status === "held_by_you" && holdIds[s.seat_id]);
  const totalFare = mySeats.reduce((sum, s) => sum + Number(s.fare), 0);

  const seatColor = (status) => {
    if (status === "available") return "#e0e0e0";
    if (status === "held_by_you") return "#4caf50";
    return "#9e9e9e";
  };

  const renderDeck = (deckLabel, deckSeats) => (
    <div className="deck-box">
      <h4 style={{ marginTop: 0, textAlign: "center" }}>{deckLabel}</h4>
      <div className="seat-grid">
        {deckSeats.map((seat) => {
          const isSleeper = seat.seat_type === "SLEEPER";
          const clickable = seat.status !== "booked_or_held";
          return (
            <div
              key={seat.seat_id}
              onClick={() => clickable && handleSeatClick(seat)}
              title={`${seat.seat_number} - ₹${seat.fare}`}
              style={{
                width: isSleeper ? "clamp(60px, 18vw, 78px)" : "clamp(38px, 12vw, 44px)",
                height: 44,
                borderRadius: isSleeper ? 8 : 6,
                background: seatColor(seat.status),
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                cursor: clickable ? "pointer" : "not-allowed",
                border: "1px solid #999", fontSize: 11, userSelect: "none",
                flexShrink: 0,
              }}
            >
              <span>{seat.seat_number}</span>
              <span style={{ fontSize: 9 }}>₹{seat.fare}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const lowerSeats = seats.filter((s) => s.deck === "LOWER");
  const upperSeats = seats.filter((s) => s.deck === "UPPER");

  return (
    <div className="page">
      <h2>Select Your Seats</h2>

      <div className="row-wrap" style={{ marginBottom: 15 }}>
        <label>Boarding:{" "}
          <select value={boardingStop} onChange={(e) => setBoardingStop(e.target.value)}>
            <option value="">-- select --</option>
            {stops.map((s) => <option key={s.id} value={s.id}>{s.stop_name}</option>)}
          </select>
        </label>

        <label>Dropping:{" "}
          <select value={droppingStop} onChange={(e) => setDroppingStop(e.target.value)}>
            <option value="">-- select --</option>
            {stops.map((s) => <option key={s.id} value={s.id}>{s.stop_name}</option>)}
          </select>
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="deck-row">
        {renderDeck("Lower Deck", lowerSeats)}
        {upperSeats.length > 0 && renderDeck("Upper Deck", upperSeats)}
      </div>

      <div className="row-wrap" style={{ marginTop: 15, fontSize: 13 }}>
        <span><span style={{ background: "#e0e0e0", padding: "2px 10px", borderRadius: 4 }}>&nbsp;</span> Available</span>
        <span><span style={{ background: "#4caf50", padding: "2px 10px", borderRadius: 4 }}>&nbsp;</span> Selected by you</span>
        <span><span style={{ background: "#9e9e9e", padding: "2px 10px", borderRadius: 4 }}>&nbsp;</span> Booked/held</span>
      </div>

      {mySeats.length > 0 && (
        <div className="card" style={{ marginTop: 20 }}>
          <p>Selected: {mySeats.map((s) => s.seat_number).join(", ")}</p>
          <p>Total Fare: ₹{totalFare}</p>
          <button
            className="btn"
            disabled={busy}
            onClick={() => navigate("/payment", { state: { holdIds: Object.values(holdIds), totalFare } })}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}