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
        borderColor: "hsl(181, 87%, 46%)",
        tension: 0.1,
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
    <div className="w-full h-full place-self-center min-h-[250px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
