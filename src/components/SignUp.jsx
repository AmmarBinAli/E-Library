import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../backend/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Role assign karo
      const adminEmail = "admin@gmail.com";
      const assignedRole = email.toLowerCase() === adminEmail.toLowerCase() ? "admin" : "user";

      // Firestore me save karo
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        userName: userName || (assignedRole === "admin" ? "Admin" : "User"),
        role: assignedRole,
      });

      alert("Signup successful!");
      navigate("/login");
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-4 py-3 rounded-lg border"/>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your Username" required className="w-full px-4 py-3 rounded-lg border"/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-3 rounded-lg border"/>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">SignUp</button>
        </form>
        <div className="flex justify-center items-center mt-6 text-sm text-gray-600">
          <Link to="/login" className="hover:text-blue-700">Login</Link>
        </div>
      </div>
    </div>
  );
}
