import React, { useMemo } from "react";
import { Button, Card, Container } from "../components/ui";
import RevenueChart from "../components/charts/RevenueChart";
import UsersGrowthChart from "../components/charts/UsersGrowthChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionsContext";

const Dashboard = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { transactions } = useTransactions();

  // Calculate metrics based on transaction data
  const metrics = useMemo(() => {
    const totalRevenue = transactions
      .filter((tx) => tx.status === "Success")
      .reduce((acc, tx) => {
        const amount =
          typeof tx.amount === "string"
            ? parseFloat(tx.amount.replace(/[$,]/g, ""))
            : tx.amount;
        return acc + amount;
      }, 0);

    const successRate =
      transactions.length > 0
        ? (transactions.filter((tx) => tx.status === "Success").length /
            transactions.length) *
          100
        : 0;

    const pendingCount = transactions.filter(
      (tx) => tx.status === "Pending",
    ).length;

    return {
      totalRevenue: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalRevenue),
      totalTransactions: transactions.length,
      successRate: successRate.toFixed(1) + "%",
      pendingCount,
    };
  }, [transactions]);

  return (
    <Container className="py-8">
      {/* ... existing auth UI ... */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            Auth Status:
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isAuthenticated
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isAuthenticated ? "Logged In" : "Logged Out"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={login}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-100 text-red-600 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors border border-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Welcome back to your PulseBoard overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Export JSON</Button>
            <Button variant="primary">New Project</Button>
          </div>
        </header>

        {/* Stats Section */}
        <section>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Key Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col gap-1 border-l-4 border-l-green-500">
              <span className="text-sm font-medium text-gray-500">
                Total Revenue
              </span>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalRevenue}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-green-600">
                  +20.1%
                </span>
                <span className="text-xs text-gray-400">from last month</span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-l-4 border-l-blue-500">
              <span className="text-sm font-medium text-gray-500">
                Total Transactions
              </span>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.totalTransactions}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-green-600">
                  +12
                </span>
                <span className="text-xs text-gray-400">new today</span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-l-4 border-l-indigo-500">
              <span className="text-sm font-medium text-gray-500">
                Success Rate
              </span>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.successRate}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-green-600">
                  +2%
                </span>
                <span className="text-xs text-gray-400">than average</span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-l-4 border-l-yellow-500">
              <span className="text-sm font-medium text-gray-500">
                Pending Actions
              </span>
              <div className="text-3xl font-bold text-gray-900">
                {metrics.pendingCount}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-yellow-600">
                  High Priority
                </span>
                <span className="text-xs text-gray-400">needs review</span>
              </div>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <UsersGrowthChart />
          </div>
        </section>

        {/* Recent Activity Section */}
        <section>
          <RecentActivity />
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
