import { useState } from "react";
import ViewBuses from "./ViewBuses";
import AddBus from "./AddBus";
import UpdateBus from "./UpdateBus";
import DeleteBus from "./DeleteBus";

function BusesAdmin() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="admin-module">
      <h1>Buses Management</h1>

      <div className="admin-actions">
        <button onClick={() => setActiveTab("view")}>View Buses</button>
        <button onClick={() => setActiveTab("add")}>Add Bus</button>
        <button onClick={() => setActiveTab("update")}>Update Bus</button>
        <button onClick={() => setActiveTab("delete")}>Delete Bus</button>
      </div>

      <div className="admin-content">
        {activeTab === "view" && <ViewBuses />}
        {activeTab === "add" && <AddBus />}
        {activeTab === "update" && <UpdateBus />}
        {activeTab === "delete" && <DeleteBus />}
      </div>
    </div>
  );
}

export default BusesAdmin;