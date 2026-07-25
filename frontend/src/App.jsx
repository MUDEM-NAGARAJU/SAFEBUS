import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Buses from "./pages/Buses";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TripsAdmin from "./pages/admin/trips/TripsAdmin";
import BusesAdmin from "./pages/admin/buses/BusesAdmin";
import RoutesAdmin from "./pages/admin/routes/RoutesAdmin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/trips" element={<TripsAdmin />} />
        <Route path="/admin/buses" element={<BusesAdmin />} />
        <Route path="/admin/routes" element={<RoutesAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
