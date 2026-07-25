import {useState} from "react";
import ViewRoutes from "./ViewRoute";
import AddRoute from "./AddRoute";
import UpdateRoute from "./UpdateRoute";
import DeleteRoute from "./DeleteRoute";

function RoutesAdmin() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="admin-module">
      <h1>Routes Management</h1>

      <div className="admin-actions">
        <button onClick={() => setActiveTab("view")}>View Routes</button>
        <button onClick={() => setActiveTab("add")}>Add Route</button>
        <button onClick={() => setActiveTab("update")}>Update Route</button>
        <button onClick={() => setActiveTab("delete")}>Delete Route</button>
      </div>

      <div className="admin-content">
        {activeTab === "view" && <ViewRoutes />}
        {activeTab === "add" && <AddRoute />}
        {activeTab === "update" && <UpdateRoute />}
        {activeTab === "delete" && <DeleteRoute />}
      </div>
    </div>
  );
}

export default RoutesAdmin;