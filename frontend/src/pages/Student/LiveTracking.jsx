import React, { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import api from '@/utils/api';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
            {sensorData.length > 0 ? (
            <>
            <div className='mt-10 text-xl text-center'>Real-Time Sensor Data</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30px]">ID</TableHead>
                            <TableHead className="w-[30px]">Value</TableHead>
                            <TableHead className="w-[30px]">Unit</TableHead>
                            <TableHead className="w-[30px]">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sensorData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{data.id}</TableCell>
                                <TableCell>{data.value}</TableCell>
                                <TableCell>{data.unit}</TableCell>
                                <TableCell>{new Date(data.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </>
            ) : (
                <p>Waiting for sensor data...</p>
            )}
        </div>
    );
};

export default LiveTracking;