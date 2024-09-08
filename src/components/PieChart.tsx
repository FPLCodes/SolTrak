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
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <Card
      className={cn(
        "min-w-[250px] min-h-[250px] w-full h-full text-primary-foreground mt-4 sm:mt-0"
      )}
    >
      <CardHeader>
        <CardTitle className="text-white">Token Distribution</CardTitle>
        <CardDescription className="text-muted-foreground">
          {tokens.length === 0
            ? "No tokens found in the wallet"
            : "Distribution of tokens in the wallet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {tokens.length === 0 ? (
          <p className="text-muted mt-20 text-sm">No tokens found</p>
        ) : (
          <div className="w-[240px] h-[240px]">
            <Pie data={data} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PieChart;
