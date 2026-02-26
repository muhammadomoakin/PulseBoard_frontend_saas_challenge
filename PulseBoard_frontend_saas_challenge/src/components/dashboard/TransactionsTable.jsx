import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card } from "../ui";

import { transactions } from "@/data/transactions";

const TransactionsTable = ({ searchQuery = "" }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    if (sortField === "amount") {
      // Handle both string currency format and raw numbers
      valueA =
        typeof valueA === "string"
          ? parseFloat(valueA.replace(/[$,]/g, ""))
          : valueA;
      valueB =
        typeof valueB === "string"
          ? parseFloat(valueB.replace(/[$,]/g, ""))
          : valueB;
    }

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedTransactions.length / rowsPerPage),
  );

  // Ensure current page is within valid bounds for calculation
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTransactions = sortedTransactions.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage,
  );

  /**
   * Returns Tailwind classes and icon for status badges based on transaction status.
   * @param {string} status
   */
  const getStatusConfig = (status) => {
    switch (status) {
      case "Success":
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

  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1 inline" />
    ) : (
      <ChevronDown size={14} className="ml-1 inline" />
    );
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">All Transactions</h3>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer bg-white"
        >
          <option value="All">All</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-y border-gray-100">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th
                className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date {renderSortIndicator("date")}
                </div>
              </th>
              <th
                className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Amount {renderSortIndicator("amount")}
                </div>
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </td>
                </tr>
              ))
            ) : sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="text-4xl mb-4">📭</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      No transactions found
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((transaction) => {
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
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && sortedTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-4 pb-4">
          <div className="text-sm text-gray-500 font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border border-gray-200 rounded px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border border-gray-200 rounded px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TransactionsTable;
