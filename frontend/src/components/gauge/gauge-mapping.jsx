import React from "react";
import GaugeComponent from "react-gauge-component";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const GaugeCard = ({ sensors, sensorData }) => {
    return (
        <div className="w-full overflow-auto">
            <div className="flex flex-wrap justify-center gap-4">
                {sensorData.map((data, index) => (
                    <Card
                        key={index}
                        className="bg-secondary rounded-xl shadow-xl w-80 sm:w-64 lg:w-72 max-w-full mb-6"
                    >
                        <CardHeader className="flex flex-col items-center justify-center h-16">
                            <CardTitle className="text-xl font-bold text-center">
                                {sensors[index]?.name}
                            </CardTitle>
                            <CardDescription className="text-base font-medium text-center">
                                {sensors[index]?.type}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <GaugeComponent
                                value={data[0] ? data[0].value : 0}
                                unit={data[0] ? data[0].unit : "N/A"}
                                label={sensors[index]?.name}
                            />
                            <p className="text-center mt-2">
                                {data[0] ? data[0].value : 0} {data[0] ? data[0].unit : "N/A"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GaugeCard;
