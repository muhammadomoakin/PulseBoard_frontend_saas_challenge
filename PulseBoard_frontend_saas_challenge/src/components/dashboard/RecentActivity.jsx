import React from "react";
import Card from "../ui/Card";
import { useTransactions } from "../../context/TransactionsContext";
import { useTheme } from "../../context/ThemeContext";
import { Clock, CheckCircle2, AlertCircle, ShoppingCart } from "lucide-react";

/**
 * RecentActivity Component
 * Displays a list of recent transactions from the global context.
 */
const RecentActivity = () => {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "Pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "Failed":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <ShoppingCart size={16} className="text-indigo-500" />;
    }
  };

  return (
    <Card
      className={`flex flex-col transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : ""}`}
    >
      <div className="mb-4">
        <h3
          className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Recent Activity
        </h3>
        <p
          className={`text-sm mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          Monitor latest transactions across your platform
        </p>
      </div>

      <div className="flex flex-col -mx-6">
        {recentTransactions.length === 0 ? (
          <div
            className={`py-8 px-6 text-center text-sm italic ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            No recent activity found
          </div>
        ) : (
          recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between py-4 px-6 border-b transition-all duration-200 cursor-pointer group last:border-0 ${
                isDark
                  ? "border-slate-800 hover:bg-slate-800/50"
                  : "border-slate-50 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? "bg-slate-800 group-hover:bg-slate-700"
                      : "bg-slate-50 group-hover:bg-white"
                  }`}
                >
                  {getStatusIcon(tx.status)}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isDark
                        ? "text-slate-200 group-hover:text-indigo-400"
                        : "text-slate-700 group-hover:text-indigo-600"
                    }`}
                  >
                    {tx.customerName}
                  </span>
                  <span className="text-xs text-slate-400">
                    Payment of {tx.amount} • {tx.status}
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {tx.date}
              </span>
            </div>
          ))
        )}
      </div>

      <button className="mt-6 text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors inline-flex items-center gap-1 group w-fit">
        View all transactions
        <span className="group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </Card>
  );
};

export default RecentActivity;
