import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../backend/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/"); // login ke baad home pe redirect
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600">
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Welcome Back 👋
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
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-700">
            Forgot Password?
          </a>
          <Link to="/signup" className="hover:text-blue-700">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
