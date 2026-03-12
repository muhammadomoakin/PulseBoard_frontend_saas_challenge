import React, { useState, useMemo } from "react";
import { Button, Card, Container } from "../components/ui";
import RevenueChart from "../components/RevenueChart";
import TransactionsChart from "../components/TransactionsChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState("6m");

  const isDark = theme === "dark";

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
    <Container className="py-6 sm:py-10">
      {/* Auth Status Banner */}
      <div
        className={`mb-8 p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between shadow-xl gap-4 transition-all duration-300 ${
          isDark
            ? "bg-slate-900 border-slate-800 shadow-slate-950/50"
            : "bg-white border-slate-100 shadow-slate-200/40"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isAuthenticated
                ? isDark
                  ? "bg-emerald-500/10"
                  : "bg-emerald-50"
                : isDark
                  ? "bg-rose-500/10"
                  : "bg-rose-50"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${isAuthenticated ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
            ></div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Authentication
            </p>
            <p
              className={`text-sm font-black ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {isAuthenticated ? "Identity Verified" : "Access Restricted"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={login}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            Login
          </button>
          <button
            onClick={logout}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
              isDark
                ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-10 sm:space-y-14">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2
              className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Overview
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-bold max-w-lg leading-relaxed">
              Monitoring your business pulse in real-time. Everything is looking
              sharp today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              Export Data
            </Button>
            <Button
              variant="primary"
              className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30"
            >
              New Project
            </Button>
          </div>
        </header>

        {/* Stats Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="font-black uppercase tracking-widest text-[11px] text-slate-400">
              Core Performance Indicators
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                label: "Total Revenue",
                value: metrics.totalRevenue,
                trend: "+20.1%",
                trendLabel: "Monthly",
                type: "success",
              },
              {
                label: "Transactions",
                value: metrics.totalTransactions,
                trend: "+12",
                trendLabel: "Today",
                type: "primary",
              },
              {
                label: "Success Rate",
                value: metrics.successRate,
                trend: "OPTIMAL",
                type: "success",
              },
              {
                label: "Pending",
                value: metrics.pendingCount,
                trend: "ACTION REQ.",
                type: "warning",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className={`flex flex-col gap-1 border-none shadow-xl rounded-3xl p-6 group hover:translate-y-[-4px] transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900 shadow-slate-950/40"
                    : "bg-white shadow-slate-200/30"
                }`}
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </span>
                <div
                  className={`text-3xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      stat.type === "success"
                        ? isDark
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : stat.type === "warning"
                          ? isDark
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                          : isDark
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            : "bg-indigo-50 text-indigo-600 border-indigo-100"
                    }`}
                  >
                    {stat.trend}
                  </span>
                  {stat.trendLabel && (
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      {stat.trendLabel}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <div className="flex items-center justify-between mt-10 mb-4">
            <h2
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Analytics Overview
            </h2>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`border rounded-xl px-4 py-2 text-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <option value="6m">Last 6 Months</option>
              <option value="3m">Last 3 Months</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-3xl shadow-xl transition-all duration-300 ${isDark ? "bg-slate-900 shadow-slate-950/40" : "bg-white shadow-slate-200/30"}`}
            >
              <h2
                className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Revenue Overview
              </h2>
              <RevenueChart timeRange={timeRange} />
            </div>

            <div
              className={`p-6 rounded-3xl shadow-xl transition-all duration-300 ${isDark ? "bg-slate-900 shadow-slate-950/40" : "bg-white shadow-slate-200/30"}`}
            >
              <h2
                className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Transactions Overview
              </h2>
              <TransactionsChart />
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <RecentActivity />
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
