import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "./ui/Card";

/**
 * Sample Revenue data for demonstration.
 * In a real-world app, this would be fetched from an API or State Context.
 */
const data6m = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 5300 },
];

const data3m = [
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 5300 },
];

const data30d = [
  { month: "Week 1", revenue: 1200 },
  { month: "Week 2", revenue: 1800 },
  { month: "Week 3", revenue: 1600 },
  { month: "Week 4", revenue: 2100 },
];

/**
 * RevenueChart Component
 * A premium revenue visualization component inspired by modern SaaS dashboards.
 */
const RevenueChart = ({ timeRange }) => {
  let chartData;

  if (timeRange === "3m") chartData = data3m;
  else if (timeRange === "30d") chartData = data30d;
  else chartData = data6m;
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Revenue Performance
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            Monthly recurring revenue growth
          </p>
        </div>
        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 uppercase tracking-wide">
          +12.5% vs Last Year
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            {/* Horizontal-only grid lines for a cleaner, modern look */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                padding: "12px 16px",
              }}
              itemStyle={{
                fontWeight: 700,
                color: "#6366f1",
                fontSize: "14px",
              }}
              labelStyle={{
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "4px",
              }}
              cursor={{
                stroke: "#e2e8f0",
                strokeWidth: 2,
                strokeDasharray: "6 6",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#6366f1",
                strokeWidth: 3,
                stroke: "#fff",
              }}
              activeDot={{
                r: 9,
                strokeWidth: 4,
                stroke: "#fff",
                fill: "#4f46e5",
                shadow: "0 10px 15px -3px rgba(99, 102, 241, 0.4)",
              }}
              animationDuration={2500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
