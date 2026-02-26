import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
} from "lucide-react";
import { Container, Card } from "../components/ui";
import { transactions } from "../data/transactions";

/**
 * Helper to format currency
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Custom Tooltip component for Recharts
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg outline-none">
        <p className="text-xs font-bold text-gray-400 uppercase mb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold text-gray-900">
            {entry.name === "revenue"
              ? formatCurrency(entry.value)
              : `${entry.value} Trans.`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Analytics Page - Business Intelligence Style
 * Features high-level KPIs and detailed graphical reporting.
 */
const Analytics = () => {
  // Process data from transactions
  const stats = useMemo(() => {
    // Helper to parse currency strings like "$1,250.00"
    const parseAmount = (amountStr) => {
      return parseFloat(amountStr.replace(/[$,]/g, ""));
    };

    const totalTransactions = transactions.length;
    const successfulTransactions = transactions.filter(
      (t) => t.status === "Success",
    );
    const totalRevenue = successfulTransactions.reduce(
      (acc, curr) => acc + parseAmount(curr.amount),
      0,
    );
    const successRate = (
      (successfulTransactions.length / totalTransactions) *
      100
    ).toFixed(1);

    // Group by date for charts
    const dailyDataMap = {};
    const statusMap = { Success: 0, Pending: 0, Failed: 0 };

    transactions.forEach((tx) => {
      const date = tx.date;
      const amount = parseAmount(tx.amount);

      if (!dailyDataMap[date]) {
        dailyDataMap[date] = { date, revenue: 0, volume: 0 };
      }

      dailyDataMap[date].volume += 1;
      if (tx.status === "Success") {
        dailyDataMap[date].revenue += amount;
      }

      statusMap[tx.status] = (statusMap[tx.status] || 0) + 1;
    });

    // Convert daily map to sorted array
    const sortedDailyData = Object.values(dailyDataMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    // Pie chart distribution
    const pieData = [
      { name: "Success", value: statusMap.Success, color: "#10B981" },
      { name: "Pending", value: statusMap.Pending, color: "#F59E0B" },
      { name: "Failed", value: statusMap.Failed, color: "#EF4444" },
    ];

    return {
      totalRevenue,
      totalTransactions,
      successRate,
      dailyData: sortedDailyData,
      pieData,
    };
  }, []);

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Intelligence Reporting
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Real-time performance analytics for the last 30 days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              LIVE DATA
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </h3>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-0.5 text-emerald-600 font-bold">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </span>
              <span className="text-gray-400">vs. previous period</span>
            </div>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Total Transactions
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalTransactions.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-gray-900 font-medium">Average Load</span>
              <span className="text-gray-400">Stable across period</span>
            </div>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Success Rate
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.successRate}%
                </h3>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${stats.successRate}%` }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Line Chart - Large */}
          <Card className="lg:col-span-2 flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Revenue Growth
                </h3>
                <p className="text-sm text-gray-500">
                  Daily revenue performance
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-md">
                  Last 30D
                </button>
                <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-md">
                  90D
                </button>
              </div>
            </div>

            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stats.dailyData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    tickFormatter={(str) => {
                      const date = new Date(str);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Status Distribution Pie Chart */}
          <Card className="flex flex-col min-h-[450px]">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-indigo-500" />
                Status Mix
              </h3>
              <p className="text-sm text-gray-500">
                Transaction integrity distribution
              </p>
            </div>

            <div className="flex-1 w-full flex items-center justify-center min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    content={({ payload }) => (
                      <div className="flex justify-center gap-4 mt-4">
                        {payload.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1.5"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            ></span>
                            <span className="text-xs font-bold text-gray-600">
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
              {stats.pieData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {((item.value / stats.totalTransactions) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Transaction Volume Bar Chart - Full Width below */}
          <Card className="lg:col-span-3 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Transaction Volume
                </h3>
                <p className="text-sm text-gray-500">
                  Number of transactions processed per day
                </p>
              </div>
            </div>

            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.dailyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    tickFormatter={(str) => {
                      const date = new Date(str);
                      return date.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      });
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="volume"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Analytics;
