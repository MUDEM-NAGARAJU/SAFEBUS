import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Buses from "./pages/Buses";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TripsAdmin from "./pages/admin/trips/TripsAdmin";
import BusesAdmin from "./pages/admin/buses/BusesAdmin";
import RoutesAdmin from "./pages/admin/routes/RoutesAdmin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/buses" element={<Buses />} />

          <Route path="/trip/:tripId/seats" element={
            <ProtectedRoute><SeatSelection /></ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute><Payment /></ProtectedRoute>
          } />
          <Route path="/ticket" element={
            <ProtectedRoute><Ticket /></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute><MyBookings /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute staffOnly><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/trips" element={
            <ProtectedRoute staffOnly><TripsAdmin /></ProtectedRoute>
          } />
          <Route path="/admin/buses" element={
            <ProtectedRoute staffOnly><BusesAdmin /></ProtectedRoute>
          } />
          <Route path="/admin/routes" element={
            <ProtectedRoute staffOnly><RoutesAdmin /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;