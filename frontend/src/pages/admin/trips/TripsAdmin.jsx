import { useState } from "react";
import ViewTrips from "./ViewTrips";
import AddTrip from "./AddTrip";
import UpdateTrip from "./UpdateTrip";
import DeleteTrip from "./DeleteTrip";

function TripsAdmin() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="admin-module">
      <h1>Trips Management</h1>

      {/* Buttons */}
      <div className="admin-actions">
        <button onClick={() => setActiveTab("view")}>View Trips</button>
        <button onClick={() => setActiveTab("add")}>Add Trip</button>
        <button onClick={() => setActiveTab("update")}>Update Trip</button>
        <button onClick={() => setActiveTab("delete")}>Delete Trip</button>
      </div>

      {/* Dynamic Section */}
      <div className="admin-content">
        {activeTab === "view" && <ViewTrips />}
        {activeTab === "add" && <AddTrip />}
        {activeTab === "update" && <UpdateTrip />}
        {activeTab === "delete" && <DeleteTrip />}
      </div>
    </div>
  );
}

export default TripsAdmin;