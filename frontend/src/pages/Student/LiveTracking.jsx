import React, { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import api from '@/utils/api';

const LiveTracking = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.connect();

    // Listen for incoming sensor data from the backend
    socket.on("sensorData", (data) => {
        console.log("Received sensor data:", data);
        setSensorData(data);
    });

    // Cleanup: Disconnect when component unmounts
    return () => {
        socket.disconnect();
    };
}, []);

return (
    <div>
        <h1>Real-Time Sensor Data</h1>
        {sensorData ? (
            <p>Latest Data: {JSON.stringify(sensorData)}</p>
        ) : (
            <p>Waiting for sensor data...</p>
        )}
    </div>
);
};

export default LiveTracking;