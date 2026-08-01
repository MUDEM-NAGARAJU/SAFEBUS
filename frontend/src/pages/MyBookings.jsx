import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("bookings/");
        setBookings(res.data.results || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p className="page">Loading your bookings...</p>;

  return (
    <div className="page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="card">
            <p><b>Reference:</b> {b.booking_reference}</p>
            <p><b>Status:</b> {b.booking_status} | <b>Payment:</b> {b.payment_status}</p>
            <p><b>Fare Paid:</b> ₹{b.fare_paid}</p>
            <p><b>Booked on:</b> {new Date(b.booking_date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}