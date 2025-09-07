import logo from "../assets/Library_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "../backend/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import RoleModal from "./ui/RoleModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Firestore se role laa rahe hain
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    navigate("/");
    alert("logged out successfully");
  };

  return (
    <nav className="bg-blue-500 shadow px-6 py-2 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          <span className="font-bold text-2xl text-white">E-Library</span>
        </div>
      </Link>

      {/* Menu Links (Desktop) */}
      <ul className="hidden md:flex flex-1 justify-center space-x-12 items-center text-white text-xl">
        <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
          <Link to="/">Home</Link>
        </li>
        <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
          <Link to="/library">Library</Link>
        </li>
        <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
          <Link to="/MyBooks">My Books</Link>
        </li>
        <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

      {role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin Panel
          </Link>
        )}

      {/* Right Button (Desktop) */}
      <div className="hidden md:block">
        {user ? (
          <button
            onClick={handleLogout}
            className="font-semibold w-28 h-12 bg-red-600 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            Logout
          </button>
        ) : (
         <button
            onClick={() => setShowRoleModal(true)}
            className="font-semibold w-28 h-12 bg-blue-950 text-white rounded-md shadow-md"
          >
            My Account
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-500 flex flex-col items-center space-y-4 py-4 text-white md:hidden shadow-lg z-10">
          <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
            <Link to="/library" onClick={() => setIsOpen(false)}>Library</Link>
          </li>
          <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
            <Link to="/MyBooks" onClick={() => setIsOpen(false)}>My Books</Link>
          </li>
          <li className="font-semibold cursor-pointer hover:text-gray-200 transition-transform duration-200 hover:scale-105">
            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          </li>
          <li>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="font-semibold w-28 h-12 bg-red-600 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="font-semibold w-28 h-12 bg-blue-950 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg">
                  My Account
                </button>
              </Link>
            )}
          </li>
        </ul>
      )}
       {/* Role Modal */}
      <RoleModal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} />
    </nav>
  );
}
