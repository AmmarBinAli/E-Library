import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Library from "./pages/Library";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Reader from "./pages/Reader";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybooks"
          element={
            <ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reader/:id"
          element={
            <ProtectedRoute>
              <Reader />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
