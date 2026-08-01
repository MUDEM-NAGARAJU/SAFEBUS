import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <button className="btn" onClick={() => navigate("/admin/trips")}>Trips</button>
        <button className="btn" onClick={() => navigate("/admin/buses")}>Buses</button>
        <button className="btn" onClick={() => navigate("/admin/routes")}>Routes</button>
      </div>
    </div>
  );
}

export default AdminDashboard;