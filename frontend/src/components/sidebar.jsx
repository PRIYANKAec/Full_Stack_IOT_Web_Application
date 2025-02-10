import React from "react";
import { Link } from "react-router-dom";

import { FaSignInAlt } from "react-icons/fa";
import { FolderOpenDotIcon, House, LocateFixedIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      {/* Top Bar */} 
          <div style={{ backgroundColor: "#03045E" }} className="text-white px-8 py-4 flex flex-col">
            <div className="flex items-center space-x-2">
              <img src="https://moodle.bitsathy.ac.in/pluginfile.php/1/theme_adaptable/logo/1722835238/bit-logo-text.png" alt="IoT Dashboard Logo" className="h-8" />
              <div className="flex flex-col">
                <span className="text-xl font-bold">BIT-IOTdashboard</span>
                <span className="text-xs text-gray-400">For Students</span>
              </div>
            </div>
          </div>

      {/* SideBar */}
      <div className="bg-slate-200 flex flex-col flex-grow w-48 h-screen p-2">
      <div className="flex flex-col text-xl font-medium text-stone-900 ">
        <div className="py-5 flex flex-col space-y-8">

        <Link to="/studentHome" className="hover:text-stone-500">
        <div className="flex flex-row ">
          <House className="mr-2"/> <span>Home</span>
        </div>
      </Link>

      <Link to="/liveTracking" className="hover:text-stone-500">
        <div className="flex flex-row ">
          <LocateFixedIcon className="mr-2"/> <span>LiveTracking</span>
        </div>
      </Link>

      <Link to="/projects" className="hover:text-stone-500">
        <div className="flex flex-row ">
          <FolderOpenDotIcon className="mr-2"/> <span>Projects</span>
        </div>
      </Link>
        
        </div>
      </div>

      <div className=" p-2 ">
        <Link to="/login" className="bg-[#48CAE4] hover:bg-[#0096C7] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition">
          <FaSignInAlt />
          <span>Login</span>
        </Link>
      </div>
      
      </div>
      </div>
  );
};

export default Sidebar;