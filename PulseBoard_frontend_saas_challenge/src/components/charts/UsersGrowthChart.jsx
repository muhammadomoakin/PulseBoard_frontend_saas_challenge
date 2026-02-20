import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyActiveUsersData } from "../../data/analyticsData";
import Card from "../ui/Card";

/**
 * Custom Tooltip component for a professional SaaS feel
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-lg outline-none">
        <p className="text-sm font-semibold text-slate-500 mb-1">
          {label} 2024
        </p>
        <p className="text-lg font-bold text-slate-900">
          {payload[0].value.toLocaleString()} Users
        </p>
        <p className="text-xs font-medium mt-1 inline-flex items-center gap-1 text-emerald-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Active Rate: {payload[0].payload.activeRate}%
        </p>
      </div>
    );
  }
  return null;
};

/**
 * UsersGrowthChart Component
 * Visualizes user growth over time using a modern AreaChart.
 */
const UsersGrowthChart = () => {
  return (
    <Card className="flex flex-col h-[400px] w-full group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 border-transparent hover:border-indigo-100/50">
      {/* Header Section */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            User Growth
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Monthly active user acquisition
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
              Live Scale
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyActiveUsersData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
              wrapperStyle={{ outline: "none" }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
              animationDuration={2500}
              animationEasing="ease-in-out"
              activeDot={{
                r: 6,
                strokeWidth: 4,
                stroke: "#fff",
                fill: "#6366f1",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UsersGrowthChart;
