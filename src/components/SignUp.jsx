import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      alert("Signup successful!");
      navigate("/login"); // signup ke baad login page pe bhej do
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Hello Welcome To <br /> E-Library 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border"
          />

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your Username"
            required
            className="w-full px-4 py-3 rounded-lg border"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-lg border"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-blue-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
