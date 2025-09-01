import { Routes, Route } from "react-router-dom";
import bg from "./assets/bg.jpg";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100  bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <img
              src={bg}
              alt="Background"
              className="w-full object-cover"
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
