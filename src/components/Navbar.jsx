import logo from "../assets/Library_logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 shadow px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          <span className="font-bold text-xl text-white">E-Library</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-1 justify-center space-x-12 items-center text-white text-lg">
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

      {/* Account Button */}
      <div className="hidden md:block">
        <Link to="/login">
          <button className="font-semibold w-28 h-12 bg-blue-950 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            My Account
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
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
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="font-semibold w-28 h-12 bg-blue-950 text-white rounded-md shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg">
                My Account
              </button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
