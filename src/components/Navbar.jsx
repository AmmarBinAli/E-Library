import logo from "../assets/Library_logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 shadow flex justify-between items-center px-6">

      <div className="flex items-center space-x-2 cursor-pointer">
        <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
        <span className="font-bold text-xl ">E-Library</span>
      </div>

      <ul className="flex-1 flex justify-center space-x-16 items-center p-4 text-xl">
        <li className="font-semibold cursor-pointer hover:text-white 
        transform transition-transform duration-200 hover:scale-105 "><Link to="/">Home</Link></li>
        <li className="font-semibold cursor-pointer hover:text-white  
        transform transition-transform duration-200 hover:scale-105 "><Link to="/library">Library</Link></li>
        <li className="font-semibold cursor-pointer hover:text-white 
        transform transition-transform duration-200 hover:scale-105 "><Link to="/MyBooks">My Books</Link></li>
        <li className="font-semibold cursor-pointer hover:text-white  
        transform transition-transform duration-200 hover:scale-105 "><Link to="/profile">Profile</Link></li>
      </ul>

      <Link to="/login">
        <button
          className="font-semibold w-28 h-12 bg-blue-950 text-white rounded-md m-6 shadow-md 
          transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
        >
          My Account
        </button>
      </Link>
    </nav>
  );
}
