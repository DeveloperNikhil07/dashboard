"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutChartData = {
  labels: ["Logged-in Users", "New Registered Users"], // Labels
  datasets: [
    {
      label: "User Activity",
      data: [120, 80], // Replace with actual dynamic data
      backgroundColor: [
        "rgba(75, 192, 192, 0.5)", // Green for Logged-in Users
        "rgba(255, 206, 86, 0.5)", // Yellow for New Registered Users
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)", // Green
        "rgba(255, 206, 86, 1)", // Yellow
      ],
      borderWidth: 1,
    },
  ],
};

// Chart options with legend at the bottom
const chartOptions = {
  plugins: {
    legend: {
      display: true,
      position: "bottom", // Moves labels to the bottom
      labels: {
        boxWidth: 15, // Adjusts size of the color box
        padding: 10, // Adds spacing
      },
    },
  },
};

export default function DoughnutChart() {
  return (
    <>
      <div className="doughnoutChart-wrapper mt-4 col-12 col-lg-6">
        <div className="">
          <div className="doughnout-card d-flex align-items-center justify-content-center">
            <Doughnut data={doughnutChartData} options={chartOptions}/>;
          </div>
        </div>
      </div>
    </>
  )
}
