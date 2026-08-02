import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const holdIds = state?.holdIds || [];
  const totalFare = state?.totalFare || 0;

  if (holdIds.length === 0) {
    return (
      <div className="page-narrow" style={{ textAlign: "center" }}>
        <p>No seats selected.</p>
        <button className="btn" onClick={() => navigate("/search")}>Search Buses</button>
      </div>
    );
  }

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("seat-holds/confirm-bulk/", { hold_ids: holdIds });
      navigate("/ticket", { state: { ticket: res.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Payment/booking failed. Your hold may have expired — please reselect your seats.");
      console.log(err.response?.data?.detail)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-narrow" style={{ textAlign: "center" }}>
      <h2>Payment</h2>
      <p>Amount to pay: <b>₹{totalFare}</b></p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="btn" onClick={handlePay} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}