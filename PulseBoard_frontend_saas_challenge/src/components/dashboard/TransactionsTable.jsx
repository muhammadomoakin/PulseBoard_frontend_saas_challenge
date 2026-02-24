import React, { useState } from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card } from "../ui";

// Mock transaction data
const transactions = [
  {
    id: "TRX-001",
    customerName: "Alex Rivera",
    email: "alex.rivera@example.com",
    amount: "$1,250.00",
    status: "Completed",
    date: "Feb 24, 2024",
  },
  {
    id: "TRX-002",
    customerName: "Sarah Smith",
    email: "sarah.s@example.com",
    amount: "$850.50",
    status: "Pending",
    date: "Feb 23, 2024",
  },
  {
    id: "TRX-003",
    customerName: "Michael Chen",
    email: "m.chen@example.com",
    amount: "$2,100.00",
    status: "Completed",
    date: "Feb 22, 2024",
  },
  {
    id: "TRX-004",
    customerName: "Emma Wilson",
    email: "emma.w@example.com",
    amount: "$120.00",
    status: "Failed",
    date: "Feb 21, 2024",
  },
  {
    id: "TRX-005",
    customerName: "James Rodriguez",
    email: "j.rod@example.com",
    amount: "$540.00",
    status: "Completed",
    date: "Feb 20, 2024",
  },
];

const TransactionsTable = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions =
    statusFilter === "All"
      ? transactions
      : transactions.filter((tx) => tx.status === statusFilter);

  /**
   * Returns Tailwind classes and icon for status badges based on transaction status.
   * @param {string} status
   */
  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle2 size={14} className="mr-1" />,
        };
      case "Pending":
        return {
          bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <Clock size={14} className="mr-1" />,
        };
      case "Failed":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: <AlertCircle size={14} className="mr-1" />,
        };
      default:
        return {
          bg: "bg-gray-50 text-gray-700 border-gray-200",
          icon: null,
        };
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer bg-white"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-y border-gray-100">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.map((transaction) => {
              const statusConfig = getStatusConfig(transaction.status);
              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50/50 transition-colors duration-200 group"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                        {transaction.customerName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {transaction.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.bg}`}
                    >
                      {statusConfig.icon}
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionsTable;
