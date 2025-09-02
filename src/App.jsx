import { Routes, Route } from "react-router-dom";
import bg from "./assets/bg.jpg";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Library from "./pages/Library";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100  bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full ">
              <img
                src={bg}
                alt="Background"
                className="w-full h-full object-conatin"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Welcome to E-Library
                </h1>
                <p className="text-lg md:text-2xl mb-6">
                  Explore books, manage your library, and more!
                </p>
              </div>
            </div>
          }
        />

        <Route path="/library" element={<Library />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
