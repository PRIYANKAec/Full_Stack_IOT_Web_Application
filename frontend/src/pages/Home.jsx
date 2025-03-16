import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button1";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 }
};

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userDetail = user ? JSON.stringify(user) : "No user details available";

  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <motion.div
        className="w-full bg-slate-400 h-screen"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-overlay-image bg-cover bg-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Centralized IoT Dashboard for Real-Time Project Monitoring
          </motion.h1>
          <motion.p
            className="my-4 text-lg md:text-xl opacity-80 max-w-2xl"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            An integrated IoT solution combining hardware and software for real-time device monitoring, data analytics, and seamless project tracking—all in one centralized platform.
          </motion.p>
          <motion.div variants={fadeInUp} transition={{ duration: 1, delay: 0.6 }}>
            <Button
              className="bg-foreground hover:bg-primary cursor-pointer"
              onClick={() => navigate("/projects")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Our IoT Dashboard? */}
      <motion.div
        className="bg-blue-200 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">Why Choose Our IoT Dashboard?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          A streamlined IoT management system with real-time monitoring, security, and an intuitive interface.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Live Data", desc: "View live sensor data and analytics for improved decision-making." },
            { title: "Security", desc: "Ensures safe and private data storage with secure authentication." },
            { title: "User Friendly", desc: "An intuitive and responsive design for seamless navigation." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-slate-200 rounded-lg shadow-md"
              variants={scaleIn}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        className="bg-gray-100 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">Technology Stack</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          The powerful tools used in building this IoT dashboard.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 ">
          {["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "WebSockets", "ESP32", "Raspberry Pi"].map(
            (tech, index) => (
              <motion.div key={index} className="p-4 bg-blue-200 rounded-lg shadow-md">
                {tech}
              </motion.div>
            )
          )}
        </div>
      </motion.div>

       {/* How It Works */}
       <motion.div
        className="bg-blue-200 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          A simple step-by-step process to monitor IoT devices in real time.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            "Hardware setup (ESP32, Raspberry Pi, Sensors)",
            "Sensor data transmission via WebSockets & REST API",
            "Data processing & storage in database",
            "Dashboard visualization with charts & alerts",
            "User interaction for monitoring & control",
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md text-center"
              variants={scaleIn}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover="hover"
            >
              <h3 className="text-lg font-semibold">{`Step ${index + 1}`}</h3>
              <p className="text-gray-600">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Section */}
<footer className="bg-blue-900 text-white py-5 text-center">
  <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="text-center">
        <p className="text-lg font-semibold">KAVIRAJ A</p>
        <p className="text-sm opacity-80">Email: kavirajppm2003@gmail.com</p>
        <p className="text-sm opacity-80">Connect with me on : 
        <a 
          href="https://github.com/KAVIRAJec" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline flex items-center  text-sm opacity-80"
        >
          <GitHubLogoIcon className="w-4 h-4" /> GitHub 
          <SquareArrowOutUpRight className="w-4 h-4" />
        </a>
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">PRIYANKA A</p>
        <p className="text-sm opacity-80">Email: priyankaa261103@gmail.com</p>
        <p className="text-sm opacity-80">Connect with me on : 
        <a 
            href="https://github.com/PRIYANKAec" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline flex items-center gap-1 text-sm opacity-80"
          >
           <GitHubLogoIcon className="w-4 h-4" /> GitHub 
           <SquareArrowOutUpRight className="w-4 h-4" />
          </a>
          </p>
        
      </div>
    </div>

    <div className="mt-4 md:mt-0">
      <p className="text-sm opacity-60 mt-2">
        &copy; <span id="year">{new Date().getFullYear()}</span> All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;