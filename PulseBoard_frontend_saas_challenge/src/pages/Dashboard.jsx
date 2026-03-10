import React, { useMemo } from "react";
import { Button, Card, Container } from "../components/ui";
import RevenueChart from "../components/RevenueChart";
import TransactionsChart from "../components/TransactionsChart";
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
    <Container className="py-6 sm:py-10">
      {/* Auth Status Banner - Better Responsive Design */}
      <div className="mb-8 p-5 sm:p-6 bg-white rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-slate-200/40 gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isAuthenticated ? "bg-emerald-50" : "bg-rose-50"}`}
          >
            <div
              className={`w-3 h-3 rounded-full ${isAuthenticated ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
            ></div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Authentication
            </p>
            <p className="text-sm font-black text-slate-900">
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
            className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-10 sm:space-y-14">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none">
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
              className="px-6 py-3 rounded-2xl bg-white border-slate-200 text-xs font-black uppercase tracking-widest shadow-sm"
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
            <Card className="flex flex-col gap-1 border-none shadow-xl shadow-slate-200/30 rounded-3xl p-6 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Total Revenue
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {metrics.totalRevenue}
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  +20.1%
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Monthly
                </span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-none shadow-xl shadow-slate-200/30 rounded-3xl p-6 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Transactions
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {metrics.totalTransactions}
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="text-[10px] font-black px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                  +12
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Today
                </span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-none shadow-xl shadow-slate-200/30 rounded-3xl p-6 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Success Rate
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {metrics.successRate}
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  OPTIMAL
                </span>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 border-none shadow-xl shadow-slate-200/30 rounded-3xl p-6 group hover:translate-y-[-4px] transition-all duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Pending
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {metrics.pendingCount}
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="text-[10px] font-black px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100">
                  ACTION REQ.
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              Revenue Overview
            </h2>
            <RevenueChart />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              Transactions Overview
            </h2>
            <TransactionsChart />
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <RecentActivity />
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
