import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#03045E" }} className="text-white px-8 py-4 flex justify-between items-center">

      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <img src="https://moodle.bitsathy.ac.in/pluginfile.php/1/theme_adaptable/logo/1722835238/bit-logo-text.png" alt="IoT Dashboard Logo" className="h-8" />
        <div className="flex flex-col">
          <span className="text-xl font-bold">BIT-IOTdashboard</span>
          <span className="text-xs text-gray-400">For Students</span>
        </div>
      </div>

      {/* Center - Navigation Links */}
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-[#48CAE4] transition">Home</Link>
          <Link to="/usage" className="hover:text-[#48CAE4] transition">Usage</Link>
        </li>
      </ul>

      {/* Right Side - Login Button */}
      <Link to="/login" className="bg-[#48CAE4] hover:bg-[#0096C7] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition">
        <FaSignInAlt />
        <span>Login</span>
      </Link>
    </nav>
  );
};

export default Navbar;