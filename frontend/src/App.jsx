import React, { useEffect, useState } from "react"
import './index.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import readValues from "./hooks/useSensor";

const App = () => {
  const { readLoading, readSensor, readMessage, readData } = readValues();
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        await readSensor();
        if (readData?.device_id) {
          setSensorData(prevData => {
            const updatedData = {
              ...prevData,
              [readData.device_id]: {
                device: readData.device_id,
                description: `This is ${readData.device_id}`,
                TName: "Temperature",
                temp: readData.temp,
                TUnit: "Celsius",
                HName: "Humidity",
                humidity: readData.humidity,
                HUnit: "%",
              }
            };
            console.log('Updated Sensor Data:', updatedData);
            return updatedData;
          });
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, [readData]);


  return (
    <div className="min-h-screen bg-slate-200 bg-cover bg-top">
    <div className="absolute inset-0 bg-[url('./assets/background.png')] bg-cover opacity-80"></div>
      {Object.keys(sensorData).length === 0 ? (
        <div className="flex justify-center items-center h-screen align-middle">
          <Card className="relative block max-w-sm rounded-lg bg-slate-200 p-6 shadow-lg">
            <div className="absolute inset-0 bg-[url('./assets/cardBg.png')] bg-cover opacity-40"></div>
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className='text-center'>Something Went Wrong</CardTitle>
                <CardDescription className='text-center'>404 Error..</CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center text-center text-3xl font-bold'>
                No sensor data available.
              </CardContent>
            </div>
          </Card>
        </div>
      ) : (
        <Card className='flex m-8 border-slate-700 rounded-3xl h-auto'>
          {Object.keys(sensorData).map(device_id => (
            <Card className="relative block w-[350px] rounded-lg bg-slate-200 p-6 shadow-lg m-4">
            <div className="absolute inset-0 bg-[url('./assets/cardBg.png')] bg-cover opacity-40"></div>
            <div className="relative z-10"></div>
              <CardHeader>
                <CardTitle>Device: {sensorData[device_id].device}</CardTitle>
                <CardDescription className='font-semibold'>Description: {sensorData[device_id].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Label className='block text-xl'>{sensorData[device_id].TName}:
                  <span className="text-2xl flex justify-center items-center font-bold"> {sensorData[device_id].temp} {sensorData[device_id].TUnit}</span>
                </Label>
                <Label className='block text-xl'>{sensorData[device_id].HName}:
                  <span className="text-2xl flex justify-center items-center  font-bold">{sensorData[device_id].humidity} {sensorData[device_id].HUnit}</span>
                </Label>
              </CardContent>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};

export default App