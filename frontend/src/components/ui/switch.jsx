import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FaPowerOff } from "react-icons/fa";

const Switch = ({ checked, onChange }) => {
  return (
    <label className="relative flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition duration-300 relative">
        <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${checked ? "translate-x-7" : ""}`}></div>
      </div>
    </label>
  );
};

const SwitchCard = ({ sensor }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Card Header */}
      <CardHeader className="flex items-center justify-between bg-gray-900 text-white p-4">
        <div className="flex items-center gap-2">
          <FaPowerOff className="text-xl" />
          <CardTitle className="text-lg font-semibold tracking-wide">{sensor.name}</CardTitle>
        </div>
        {/* Status Indicator */}
        <span className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wider ${isChecked ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {isChecked ? "ON" : "OFF"}
        </span>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-5">
        <p className="text-gray-700 text-sm font-medium">
          Type: <span className="font-semibold text-gray-900">{sensor.type}</span>
        </p>
        <p className="text-gray-700 text-sm font-medium mt-2">
          Status: 
          <span className={`font-bold ml-1 ${isChecked ? "text-green-600" : "text-red-600"}`}>
            {isChecked ? "Active" : "Inactive"}
          </span>
        </p>
      </CardContent>

      {/* Card Footer (Switch Button) */}
      <CardFooter className="p-4 flex justify-center">
        <Switch checked={isChecked} onChange={handleSwitchChange} />
      </CardFooter>
    </Card>
  );
};

export default SwitchCard;
