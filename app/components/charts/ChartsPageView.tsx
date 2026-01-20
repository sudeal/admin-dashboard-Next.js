"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);


const tooltipCallback = (context: any) => {
  const label = context.label || '';
  const value = context.parsed?.y || context.parsed || context.raw;
  const dataset = context.dataset;
  const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
  return `${label || dataset.label || 'Değer'}: ${value} (${percentage}%)`;
};

// Helper: Bar chart dataset oluşturma
const createBarDataset = (
  data: number[],
  backgroundColor: string,
  config?: {
    borderRadius?: number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number };
    barThickness?: number;
    barPercentage?: number;
    categoryPercentage?: number;
  }
) => ({
  data,
  backgroundColor,
  borderRadius: config?.borderRadius ?? 6,
  borderSkipped: false as const,
  barThickness: config?.barThickness ?? 6,
  maxBarThickness: config?.barThickness ?? 6,
  barPercentage: config?.barPercentage ?? 0.9,
  categoryPercentage: config?.categoryPercentage ?? 0.9,
});


const createPieData = (labels: string[], data: number[], backgroundColor: string[]) => ({
  labels,
  datasets: [{ data, backgroundColor, borderWidth: 0 }],
});

// Bar Chart Options
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
  plugins: {
    legend: { display: false as const },
    tooltip: {
      enabled: true,
      callbacks: {
        title: (context: any) => context[0].label || '',
        label: tooltipCallback,
      },
    },
  },
  scales: {
    x: { display: false as const, grid: { display: false as const } },
    y: { display: false as const, grid: { display: false as const }, suggestedMax: 100 },
  },
};

const stackedBarOptions = {
  ...barChartOptions,
  scales: {
    ...barChartOptions.scales,
    x: { ...barChartOptions.scales.x, stacked: true },
    y: { ...barChartOptions.scales.y, stacked: true },
  },
};


const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  plugins: {
    legend: { display: false as const },
    tooltip: { enabled: true, callbacks: { label: tooltipCallback } },
  },
};

const donutChartOptions = {
  ...pieChartOptions,
  cutout: '60%' as const,
};

export default function ChartsPageView() {
  
  const barLabels = (count: number) => Array.from({ length: count }, (_, i) => `Bar ${i + 1}`);

  const simpleBlueData = {
    labels: barLabels(7),
    datasets: [createBarDataset([85, 42, 67, 31, 58, 45, 72], "#3b82f6", {
      barThickness: 8,
      barPercentage: 1.0,
      categoryPercentage: 0.7,
    })],
  };

  const stackedData = {
    labels: barLabels(7),
    datasets: [
      createBarDataset([35, 28, 42, 31, 38, 29, 40], "#14b8a6", {
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 },
      }),
      createBarDataset([42, 35, 38, 44, 36, 48, 33], "rgba(59, 130, 246, 0.5)", {
        borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
      }),
    ],
  };

  const groupedData = {
    labels: barLabels(8),
    datasets: [
      createBarDataset([48, 62, 55, 71, 68, 58, 64, 52], "#3b82f6"),
      createBarDataset([52, 45, 61, 58, 49, 67, 55, 63], "#f59e0b"),
    ],
  };


  const pinkValues = [38, 52, 47, 44, 56, 49, 61];
  const pinkColors = ["#ec4899", "#f472b6", "#fbcfe8", "#fdf2f8"];
  const divideIntoFour = (value: number) => value / 4;
  
  const gradientPinkData = {
    labels: barLabels(7),
    datasets: pinkColors.map((color, index) => ({
      ...createBarDataset(
        pinkValues.map(divideIntoFour),
        color,
        index === 0 ? { borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 } } :
        index === 3 ? { borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 } } :
        { borderRadius: 0 }
      ),
      label: `Pembe ${index + 1}${index === 0 ? ' (Koyu)' : index === 3 ? ' (Açık)' : ''}`,
    })),
  };

  
  const pieCharts = [
    { data: [32, 68], colors: ["#3b82f6", "#f3f4f6"] },
    { data: [45, 55], colors: ["#a855f7", "#f3f4f6"] },
    { data: [28, 72], colors: ["#f59e0b", "#f3f4f6"] },
    { data: [38, 62], colors: ["#60a5fa", "#f3f4f6"] },
  ];

 
  const donutCharts = [
    { labels: ["Teal", "Empty"], data: [63, 37], colors: ["#14b8a6", "#e5e7eb"] },
    { labels: ["Empty", "Blue", "Orange"], data: [42, 38, 20], colors: ["#e5e7eb", "#3b82f6", "#f59e0b"] },
    { labels: ["Teal", "Yellow", "Blue"], data: [63, 22, 15], colors: ["#14b8a6", "#eab308", "#3b82f6"] },
    { labels: ["Teal", "Blue", "Yellow", "Orange"], data: [32, 28, 22, 18], colors: ["#14b8a6", "#3b82f6", "#eab308", "#f59e0b"] },
  ];

  return (
    <div className="ch-page">
      {/* Bar Charts */}
      <div className="ch-card">
        <div className="ch-card-title">Bar Chart</div>
        <div className="ch-chart-container">
          <div className="ch-chart-section">
            <Bar data={simpleBlueData} options={barChartOptions} />
          </div>
          <div className="ch-chart-section">
            <Bar data={stackedData} options={stackedBarOptions} />
          </div>
          <div className="ch-chart-section">
            <Bar data={groupedData} options={barChartOptions} />
          </div>
          <div className="ch-chart-section">
            <Bar data={gradientPinkData} options={stackedBarOptions} />
          </div>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="ch-card" style={{ marginTop: "20px" }}>
        <div className="ch-card-title">Pie Chart</div>
        <div className="ch-pie-container">
          {pieCharts.map((pie, index) => (
            <div key={index} className="ch-pie-section">
              <Pie data={createPieData(["Filled", "Empty"], pie.data, pie.colors)} options={pieChartOptions} />
            </div>
          ))}
        </div>
      </div>

      {/* Donut Charts */}
      <div className="ch-card" style={{ marginTop: "20px" }}>
        <div className="ch-card-title">Donut Chart</div>
        <div className="ch-pie-container">
          {donutCharts.map((donut, index) => (
            <div key={index} className="ch-pie-section">
              <Pie data={createPieData(donut.labels, donut.data, donut.colors)} options={donutChartOptions} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
