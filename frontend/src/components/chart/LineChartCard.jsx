"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card1";
import { Chart, ChartTooltip, ChartTooltipContent } from "@/components/ui";

const colors = ["#443ce6","#a6076e","#1dcf60","#ff7300","#035970","#82ca9d","#00ff00","#0000ff","#ff00ff","#00ffff"];

export const LineChartCard = ({ sensors, sensorData }) => {
  const chartData = sensors.map((sensor, index) => {
    return sensorData[index]?.map((dataPoint) => {
      const date = new Date(dataPoint?.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return {
        date,
        [`value-${sensor.id}`]: dataPoint?.value,
      };
    });
  }).flat();

  const chartConfig = {
    value: {
      label: "Value",
      color: "var(--chart-1)",
    },
  };

  return (
    <div className="w-full overflow-auto lg:px-16">
      {sensorData.length > 0 && sensors.length > 0 && (
        <Card className="bg-secondary rounded-xl shadow-xl w-full pt-4 mb-6">
          <CardHeader className="flex flex-col items-center justify-center h-16">
            <CardTitle className="text-base sm:text-xl font-bold text-center">
              Sensor Data Over Time
            </CardTitle>
            <CardDescription className="text-sm sm:text-base font-medium text-center">
              Compare all sensor data over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart config={chartConfig}>
                <LineChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}/>
                  <YAxis tickLine={false} axisLine={false} tickMargin={2} />
                  <Tooltip content={<ChartTooltipContent hideLabel={false} />} />
                  <Legend />
                  {sensors.map((sensor, index) => {
                    const sensorChartData = sensorData[index]?.map((dataPoint) => ({
                      date: new Date(dataPoint.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                      [`value-${sensor.id}`]: dataPoint.value,
                    }));
                    return sensorChartData && sensorChartData.length > 0 ? (
                      <Line
                        key={sensor.id}
                        type="natural"
                        dataKey={`value-${sensor.id}`}
                        name={sensor.name}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={{
                          fill: colors[index % colors.length],
                        }}
                        activeDot={{
                          r: 6,
                        }}
                      />
                    ) : null;
                  })}
                </LineChart>
            </Chart>
          </CardContent>
        </Card>
      )}
    </div>
  );
};