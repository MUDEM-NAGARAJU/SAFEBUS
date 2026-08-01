import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 16px", background: "#1a1a2e", color: "white",
      flexWrap: "wrap", gap: 10,
    }}>
      <Link to="/search" style={{ color: "white", fontWeight: "bold", fontSize: 20, textDecoration: "none" }}>
        🚍 SAFEBUS
      </Link>

      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
        <Link to="/search" style={{ color: "white", textDecoration: "none" }}>Search</Link>

        {user && (
          <Link to="/my-bookings" style={{ color: "white", textDecoration: "none" }}>My Bookings</Link>
        )}

        {user?.isStaff && (
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link>
        )}

        {user ? (
          <>
            <span style={{ opacity: 0.8 }}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={{ padding: "6px 12px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}