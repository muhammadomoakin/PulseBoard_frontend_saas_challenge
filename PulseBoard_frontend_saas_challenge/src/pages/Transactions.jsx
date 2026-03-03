import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Card } from "../components/ui";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import SearchBar from "../components/dashboard/SearchBar";
import {
  Loader2,
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
    <Container className="py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-10">
        {/* Advanced Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100 animate-in fade-in slide-in-from-left-4 duration-700">
              <TrendingUp size={12} strokeWidth={3} />
              <span>Financial Overview</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Transactions
            </h2>
            <p className="text-lg text-gray-500 max-w-xl font-medium leading-relaxed">
              Track your revenue stream and audit customer activity across your
              entire business ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
            <Button
              variant="secondary"
              onClick={handleExport}
              className="hidden sm:flex items-center gap-2 px-6 shadow-sm border-gray-200"
            >
              <Download size={18} />
              Export
            </Button>
            <Button
              variant="primary"
              onClick={handleAddMockTransaction}
              className="flex items-center gap-2 px-6 shadow-xl shadow-indigo-600/20"
            >
              <Plus size={18} strokeWidth={3} />
              New Entry
            </Button>
          </div>
        </header>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="flex flex-col lg:flex-row items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-full lg:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="h-1 lg:h-8 w-full lg:w-[1px] bg-gray-100"></div>
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap mr-2">
              Status:
            </span>
            {["All", "Success", "Pending", "Failed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-200 ${
                  statusFilter === status
                    ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                    : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 lg:ml-auto">
            <span className="font-semibold text-gray-900">{filteredCount}</span>
            <span>Results Found</span>
          </div>
        </div>

        {/* Transactions Table Section */}
        <section className="min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-8 animate-in fade-in duration-700">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-50 rounded-full"></div>
                <div className="absolute top-0 left-0 w-24 h-24 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center animate-pulse">
                    <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                  </div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <p className="text-2xl font-black text-gray-900 tracking-tight">
                  Syncing Ledger
                </p>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 bg-gray-50/50 rounded-4xl border-4 border-dashed border-gray-100 text-center animate-in fade-in zoom-in-95 duration-700 max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-white shadow-xl rounded-3xl flex items-center justify-center text-6xl mb-8 transform -rotate-6">
                🎐
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                No Transactions Found
              </h3>
              <p className="text-gray-500 mt-4 mb-10 text-xl font-medium max-w-md mx-auto leading-relaxed">
                Your transaction ledger is currently empty. This is where your
                financial journey begins.
              </p>
              <Button
                variant="primary"
                onClick={handleAddMockTransaction}
                className="px-10 py-4 rounded-2xl text-lg shadow-2xl shadow-indigo-600/30"
              >
                Initialize First Transaction
              </Button>
            </div>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
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
