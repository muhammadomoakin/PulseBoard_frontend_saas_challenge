import React from "react";
import Card from "../ui/Card";
import { useTransactions } from "../../context/TransactionsContext";
import { Clock, CheckCircle2, AlertCircle, ShoppingCart } from "lucide-react";

/**
 * RecentActivity Component
 * Displays a list of recent transactions from the global context.
 */
const RecentActivity = () => {
  const { transactions } = useTransactions();

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
    <Card className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Monitor latest transactions across your platform
        </p>
      </div>

      <div className="flex flex-col -mx-6">
        {recentTransactions.length === 0 ? (
          <div className="py-8 px-6 text-center text-slate-400 text-sm italic">
            No recent activity found
          </div>
        ) : (
          recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-4 px-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all duration-200 cursor-pointer group last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                  {getStatusIcon(tx.status)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
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

      <button className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1 group">
        View all transactions
        <span className="group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </Card>
  );
};

export default RecentActivity;
