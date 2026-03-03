import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../context/TransactionsContext";
import Card from "../ui/Card";

// Helper to format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Custom Tooltip component for a more premium look
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-lg outline-none">
        <p className="text-sm font-semibold text-slate-500 mb-1">
          {label} 2024
        </p>
        <p className="text-lg font-bold text-slate-900">
          {formatCurrency(payload[0].value)}
        </p>
        {payload[0].payload.growth !== 0 && (
          <p
            className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
              payload[0].payload.growth > 0
                ? "text-emerald-500"
                : "text-rose-500"
            }`}
          >
            {payload[0].payload.growth > 0 ? "↑" : "↓"}{" "}
            {Math.abs(payload[0].payload.growth)}%
            <span className="text-slate-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

/**
 * RevenueChart Component
 * A responsive line chart showing monthly revenue trends.
 * Derives data from TransactionsContext for live updates.
 */
const RevenueChart = () => {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Group transactions by month
    const monthlyMap = {};

    // Initialize with some months to ensure the chart looks full if data is sparse
    // or just process what we have.
    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthIndex = date.getMonth();
      const monthName = months[monthIndex];
      const year = date.getFullYear();
      const key = `${year}-${monthIndex}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          rawMonth: monthIndex,
          rawYear: year,
          month: monthName,
          revenue: 0,
        };
      }

      if (tx.status === "Success") {
        const amount =
          typeof tx.amount === "string"
            ? parseFloat(tx.amount.replace(/[$,]/g, ""))
            : tx.amount;
        monthlyMap[key].revenue += amount;
      }
    });

    // Convert to sorted array
    const sortedData = Object.values(monthlyMap).sort((a, b) => {
      if (a.rawYear !== b.rawYear) return a.rawYear - b.rawYear;
      return a.rawMonth - b.rawMonth;
    });

    // Calculate growth percentages
    return sortedData.map((curr, index, arr) => {
      if (index === 0) return { ...curr, growth: 0 };
      const prev = arr[index - 1];
      const growth =
        prev.revenue !== 0
          ? ((curr.revenue - prev.revenue) / prev.revenue) * 100
          : 0;
      return { ...curr, growth: parseFloat(growth.toFixed(1)) };
    });
  }, [transactions]);

  return (
    <Card className="flex flex-col h-[400px] w-full group">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            Revenue Overview
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Live recurring revenue performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Real-time
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
              content={<CustomTooltip />}
              cursor={{
                stroke: "#e2e8f0",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
              wrapperStyle={{ outline: "none" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 0, fill: "#6366f1" }}
              activeDot={{
                r: 6,
                strokeWidth: 4,
                stroke: "#fff",
                fill: "#6366f1",
              }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
