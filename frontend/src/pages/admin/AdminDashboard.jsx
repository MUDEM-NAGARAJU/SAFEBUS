import { useNavigate } from "react-router-dom";

import "../../styles/admin/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <button onClick={() => navigate("/admin/trips")}>
          Trips
        </button>

        <button onClick={() => navigate("/admin/buses")}>
          Buses
        </button>

        <button onClick={() => navigate("/admin/routes")}>
          Routes
        </button>

        <button onClick={() => navigate("/admin/users")}>
          Users
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;