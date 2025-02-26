import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const userDetail = user ? JSON.stringify(user) : "No user details available";

  return (
    <div className="w-full -mt-1">
      {/* Hero Section with Background Image */}
      <div className="relative w-full bg-slate-400 h-screen">
        <div
          className="absolute inset-0 bg-center opacity-50"
          style={{
            backgroundImage: "url('/iot.png')",
            filter: "brightness(60%)",
            background: "cover",
            backgroundPosition: "center"
          }}
        ></div>

        <div className="relative flex flex-col items-center justify-center h-full text-secondary text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Centralized IoT Dashboard for Real-Time Project Monitoring
          </h1>
          <p className="my-4 text-lg md:text-xl opacity-80 max-w-2xl">
            Track and manage all IoT devices in one place. Access live data, analytics, and seamless project tracking within your campus network.
          </p>
          <Button 
            className='bg-foreground hover:bg-primary'
            onClick={() => navigate('/projects')}
          >Get Started</Button>
        </div>
      </div>

      {/* Why Choose Our IoT Dashboard? */}
      <div className="bg-blue-200 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">Why Choose Our IoT Dashboard?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          A streamlined IoT management system with real-time monitoring, security, and an intuitive interface.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Live Data</h3>
            <p className="text-gray-600">View live sensor data and analytics for improved decision-making.</p>
          </div>
          <div className="p-6 bg-slate-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="text-gray-600">Hosted on a campus server, ensuring data privacy without the need for internet access.</p>
          </div>
          <div className="p-6 bg-slate-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">User Friendly</h3>
            <p className="text-gray-600">A clean, modern design tailored for students and faculty.</p>
          </div>
        </div>
      </div>

      {/* About IoT Lab Section */}
      <div id="about" className="bg-blue-300 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">About Our IoT Lab</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Our IoT Lab is a dedicated research and innovation space in our college where students and faculty collaborate on real-time embedded systems and IoT applications.
        </p>
      </div>
    
      {/* Footer with College Details */}
      <footer className="bg-blue-900 text-white py-5 text-center">
        <p className="text-lg font-semibold">Bannari Amman Institute of Technology</p>
        <p className="text-sm opacity-80">Sathyamangalam, Erode - 638401, Tamil Nadu, India</p>
        <p className="text-sm opacity-80">Phone: +91 9944854608 | Email: iot@bitsathy.ac.in</p>
        <p className="text-sm opacity-60 mt-2">&copy; 2025 BIT Sathy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;