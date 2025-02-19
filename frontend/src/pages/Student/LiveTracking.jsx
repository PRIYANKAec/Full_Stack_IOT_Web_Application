import React, { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import api from '@/utils/api';

const LiveTracking = () => {
  const [sensorData, setSensorData] = useState([]);
  const projectId = 1; // Replace with actual project ID
  const sensorId = 4; // Replace with actual sensor ID

  useEffect(() => {
    // Fetch initial sensor data
    const fetchSensorData = async () => {
      try {
        const response = await api.post(`/api/projects/${projectId}/sensor/${sensorId}/getData`, { id: 1 });
        setSensorData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    fetchSensorData();

    // Handle WebSocket updates
    socket.on('sensorData', (data) => {
      setSensorData((prevData) => [...prevData, data]);
    });

    return () => {
      socket.off('sensorData');
    };
  }, [projectId, sensorId]);

  return (
    <div>
      <h1>Sensor Data</h1>
      <ul>
        {sensorData.map((data, index) => (
          <li key={index}>{data.value} {data.unit}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveTracking;