import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Card } from "../components/ui";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import SearchBar from "../components/dashboard/SearchBar";
import {
  Plus,
  Download,
  TrendingUp,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";
import { useToast } from "../context/ToastContext";
import toast from "react-hot-toast";

// Helper component for stat cards with premium design
const StatCard = ({ title, value, icon, trend, trendUp, subtitle }) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-gray-100 overflow-hidden relative group rounded-3xl">
    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 pointer-events-none text-indigo-600">
      {React.cloneElement(icon, { size: 64 })}
    </div>
    <div className="space-y-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50/50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
          {React.cloneElement(icon, {
            size: 18,
            className: "text-indigo-600 group-hover:text-indigo-700",
          })}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div>
        <div className="text-3xl font-black text-gray-900 tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          {trend && (
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm ${trendUp ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}
            >
              {trend}
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium">
            {subtitle || "Recent activity"}
          </span>
        </div>
      </div>
    </div>
  </Card>
);

const Transactions = () => {
  const { transactions, addTransaction } = useTransactions();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for that premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Calculate stats using useMemo for performance and reactivity
  const stats = useMemo(() => {
    if (!transactions.length) return null;

    const totalCount = transactions.length;
    const successCount = transactions.filter(
      (t) => t.status === "Success",
    ).length;
    const pendingCount = transactions.filter(
      (t) => t.status === "Pending",
    ).length;

    const totalVolumeVal = transactions
      .filter((t) => t.status === "Success")
      .reduce((acc, curr) => {
        const amount =
          typeof curr.amount === "string"
            ? parseFloat(curr.amount.replace(/[$,]/g, ""))
            : curr.amount;
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);

    return {
      totalCount,
      successCount,
      pendingCount,
      totalVolume: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalVolumeVal),
      successRate:
        totalCount > 0
          ? ((successCount / totalCount) * 100).toFixed(1) + "%"
          : "0%",
    };
  }, [transactions]);

  const handleAddMockTransaction = () => {
    const nextId = `TRX-${(transactions.length + 1).toString().padStart(3, "0")}`;
    const newTx = {
      id: nextId,
      customerName: [
        "Alex Rivera",
        "Sarah Smith",
        "Michael Chen",
        "Emma Wilson",
        "Olivia Taylor",
      ][Math.floor(Math.random() * 5)],
      email: "billing@example.com",
      amount: `$${(Math.random() * 3000 + 50).toFixed(2)}`,
      status: ["Success", "Pending", "Failed"][Math.floor(Math.random() * 3)],
      date: new Date().toISOString().split("T")[0],
    };
    addTransaction(newTx);
    toast.success("Transaction added successfully");
    showToast(`Transaction ${nextId} added to ledger!`, "success");
  };

  const handleExport = () => {
    // Simulated export
    alert("Exporting " + transactions.length + " transactions to CSV...");
  };

  const filteredCount = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesStatus =
        statusFilter === "All" || tx.status === statusFilter;
      const matchesSearch =
        tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    }).length;
  }, [transactions, statusFilter, searchQuery]);

  return (
    <Container className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-6 sm:gap-12">
        {/* Advanced Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.15em] border border-indigo-100 animate-in fade-in slide-in-from-left-4 duration-700">
              <TrendingUp size={12} strokeWidth={3} />
              <span>Financial Intelligence</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] sm:leading-none">
              Transactions
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl font-bold leading-relaxed">
              Comprehensive audit trail for your digital ecosystem. Monitor
              every interaction in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
            <Button
              variant="secondary"
              onClick={handleExport}
              className="flex-1 sm:flex-none items-center justify-center gap-2 px-8 py-3.5 shadow-sm border-slate-200 bg-white hover:bg-slate-50 rounded-2xl"
            >
              <Download size={18} />
              Export
            </Button>
            <Button
              variant="primary"
              onClick={handleAddMockTransaction}
              className="flex-1 sm:flex-none items-center justify-center gap-2 px-8 py-3.5 shadow-2xl shadow-indigo-600/30 rounded-2xl"
            >
              <Plus size={18} strokeWidth={3} />
              New Entry
            </Button>
          </div>
        </header>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Revenue Volume"
            value={stats?.totalVolume || "$0"}
            icon={<DollarSign />}
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="Success Rate"
            value={stats?.successRate || "0%"}
            icon={<CheckCircle2 />}
            trend={`${stats?.successCount || 0} items`}
            trendUp={true}
            subtitle="Confirmed payments"
          />
          <StatCard
            title="Awaiting"
            value={stats?.pendingCount || 0}
            icon={<Clock />}
            subtitle="Pending processing"
          />
          <StatCard
            title="Total Entries"
            value={stats?.totalCount || 0}
            icon={<CreditCard />}
            subtitle="Records found"
          />
        </div>

        {/* Filter Management Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 bg-white p-5 sm:p-7 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="w-full lg:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="hidden lg:block h-8 w-[1px] bg-slate-100"></div>
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar scroll-smooth">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap mr-3">
              Filter by:
            </span>
            {["All", "Success", "Pending", "Failed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20"
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-3 text-xs text-slate-500 lg:ml-auto bg-slate-50 lg:bg-transparent p-3 lg:p-0 rounded-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total results:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-black text-slate-900">{filteredCount}</span>
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <section className="min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-8">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">
                Syncing Ledger...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 sm:p-24 bg-slate-50/50 rounded-4xl border-4 border-dashed border-slate-100 text-center max-w-2xl mx-auto shadow-inner">
              <div className="w-24 h-24 bg-white shadow-xl rounded-3xl flex items-center justify-center text-5xl mb-8 transform -rotate-12">
                📂
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Empty Ledger
              </h3>
              <p className="text-slate-500 mt-4 mb-10 text-lg font-bold max-w-sm mx-auto leading-relaxed">
                Connect your first data source or manually initialize a record
                to begin tracking.
              </p>
              <Button
                variant="primary"
                onClick={handleAddMockTransaction}
                className="px-12 py-5 rounded-2xl text-base shadow-2xl shadow-indigo-600/40"
              >
                Initialize Ledger
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <TransactionsTable
                searchQuery={searchQuery}
                statusFilter={statusFilter}
              />
            </div>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Transactions;
