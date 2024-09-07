import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card components

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title
);

// Function to format the dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const LineChart = ({
  data,
}: {
  data: Array<{ time: string; balance: number }>;
}) => {
  const chartData = {
    labels: data.map((point) => formatDate(point.time)), // Format the dates
    datasets: [
      {
        label: "Balance Over Time",
        data: data.map((point) => point.balance),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Balance (SOL)",
        },
      },
    },
  };

  return (
    <Card className="w-full">
      <CardContent>
        <div style={{ height: "300px" }}>
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
