"use client"

import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card1";
import { Chart, ChartTooltip, ChartTooltipContent } from "@/components/ui";

export const ChartCard = ({ sensors, sensorData }) => {

  return (
    <div className="w-full overflow-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {sensorData?.map((data, index) => {
          const salesData = data?.map((dataPoint) => {
            const month = new Date(dataPoint?.timestamp).toLocaleDateString("en-US", { month: "short" });
            const day = new Date(dataPoint?.timestamp).getDate();
            return {
              period: `${month} ${day}`,
              value: dataPoint?.value,
            };
          });

          const salesConfig = {
            value: {
              label: "Value",
              color: "var(--chart-1)",
            },
          };

          return (
            <Card key={index} className="bg-secondary rounded-xl shadow-xl w-full md:mx-12 max-w-full mb-6">
              <CardHeader className="flex flex-col items-center justify-center h-16">
                <CardTitle className="text-xl font-bold text-center">
                  {sensors[index]?.name}
                </CardTitle>
                <CardDescription className="text-base font-medium text-center">
                  {sensors[index]?.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart config={salesConfig}>
                  <BarChart data={salesData}>
                    <XAxis dataKey="period" tickLine={true} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />
                    <Bar dataKey="value" fill="var(--color-revenue)" radius={5} />
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