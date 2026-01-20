"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DealsDetails() {
  const [selectedMonth, setSelectedMonth] = useState("October");

  
  const usdData = [
    28.2, 28.1, 28.0, 28.5, 29.5, 29.3, 29.2, 29.8, 30.1, 30.4, 30.6, 30.8,
  ];
  const eurData = [
    31.7, 31.5, 31.6, 31.9, 32.2, 31.8, 32.0, 32.3, 32.5, 32.8, 33.0, 33.2,
  ];

  const labels = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const chartData = {
    labels,
    datasets: [
      {
        label: "USD",
        data: usdData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "EUR",
        data: eurData,
        borderColor: "#ec4899",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ec4899",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#ec4899",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          },
          color: "#111827",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        beginAtZero: false,
        min: 28,
        max: 34,
        ticks: {
          stepSize: 0.5,
          color: "#6b7280",
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return value.toFixed(1);
          },
        },
        grid: {
          color: "#f3f4f6",
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="dd-card">
      <div className="dd-header">
        <h2 className="dd-title">Deals Details</h2>
        <select
          className="dd-month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="dd-chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

