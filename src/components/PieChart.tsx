import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"; // Import ShadCN card components
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Title);

const PieChart = ({ tokens }: { tokens: Array<any> }) => {
  const data = {
    labels: tokens.map((token) => token.symbol),
    datasets: [
      {
        label: "Token Distribution",
        data: tokens.map((token) => parseFloat(token.amount)),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <Card className={cn("w-[300px] h-[360px] text-primary-foreground")}>
      <CardHeader>
        <CardTitle className="text-white">Token Distribution</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribution of tokens in your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="w-[240px] h-[240px]">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
