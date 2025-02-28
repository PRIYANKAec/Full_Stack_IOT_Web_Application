"use client"

import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card1";
import { Chart, ChartTooltip, ChartTooltipContent } from "@/components/ui";

export const BarChartCard = ({ sensors, sensorData }) => {

  return (
    <div className="w-full overflow-auto">
      <div className="w-full flex flex-wrap justify-center gap-4">
        {sensorData?.map((data, index) => {
          const chartData = data?.map((dataPoint) => {
            const month = new Date(dataPoint?.timestamp).toLocaleDateString("en-US", { month: "short" });
            const day = new Date(dataPoint?.timestamp).getDate();
            return {
              period: `${month} ${day}`,
              value: dataPoint?.value,
            };
          });

          const chartConfig = {
            value: {
              label: "Value",
              color: "var(--chart-1)",
            },
          };

          return (
            <Card key={index} className="bg-secondary rounded-xl shadow-xl w-full max-w-[550px] lg:w-5/12 xl:max-w-3/5 mb-6">
              <CardHeader className="flex flex-col items-center justify-center h-16">
                <CardTitle className="text-xl font-bold text-center">
                  {sensors[index]?.name}
                </CardTitle>
                <CardDescription className="text-base font-medium text-center">
                  {sensors[index]?.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart config={chartConfig}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="period" tickLine={true} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} unit={sensors[index]?.unit} />} />
                    <Bar dataKey="value" fill="var(--foreground)" radius={5} />
                  </BarChart>
                </Chart>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}