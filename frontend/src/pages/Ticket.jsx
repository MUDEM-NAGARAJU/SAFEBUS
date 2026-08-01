import { useLocation, useNavigate } from "react-router-dom";

export default function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;

  if (!ticket) {
    return (
      <div className="page-narrow">
        <p>No ticket data found.</p>
        <button className="btn" onClick={() => navigate("/search")}>Book a trip</button>
      </div>
    );
  }

  return (
    <div className="page-narrow card">
      <h2>🎫 Booking Confirmed!</h2>
      <p><b>References:</b> {ticket.booking_references?.join(", ")}</p>
      <p><b>Bus:</b> {ticket.bus_name} ({ticket.bus_number})</p>
      <p><b>Type:</b> {ticket.bus_type} / {ticket.ac_type}</p>
      <p><b>Date:</b> {ticket.travel_date} | <b>Departure:</b> {ticket.departure_time}</p>
      <p><b>From:</b> {ticket.boarding_stop} → <b>To:</b> {ticket.dropping_stop}</p>
      <p><b>Seats:</b></p>
      <ul>
        {ticket.seats?.map((s, i) => (
          <li key={i}>{s.seat_number} — ₹{s.fare}</li>
        ))}
      </ul>
      <h3>Total: ₹{ticket.total_fare}</h3>
      <p>Payment: {ticket.payment_status}</p>

      <button className="btn" onClick={() => navigate("/search")}>Book Another Trip</button>
    </div>
  );
}