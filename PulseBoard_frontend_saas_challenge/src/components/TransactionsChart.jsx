import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Sample Monthly Transactions data for demonstration.
 * In a real-world app, this would be computed from the Transactions Context.
 */
const data = [
  { month: "Jan", transactions: 35 },
  { month: "Feb", transactions: 42 },
  { month: "Mar", transactions: 28 },
  { month: "Apr", transactions: 51 },
  { month: "May", transactions: 48 },
  { month: "Jun", transactions: 62 },
];

/**
 * TransactionsChart Component
 * A clean, modern bar chart showing transaction volume per month.
 */
const TransactionsChart = () => {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              padding: "10px 14px",
            }}
            itemStyle={{
              fontWeight: 700,
              color: "#6366f1",
            }}
            labelStyle={{
              fontWeight: 600,
              color: "#64748b",
              marginBottom: "4px",
            }}
          />
          <Bar
            dataKey="transactions"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            barSize={32}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsChart;
