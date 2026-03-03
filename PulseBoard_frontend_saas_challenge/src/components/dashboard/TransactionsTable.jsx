import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card } from "../ui";
import { useTransactions } from "../../context/TransactionsContext";

const TransactionsTable = ({ searchQuery = "", statusFilter = "All" }) => {
  const { transactions, deleteTransaction, updateTransaction } =
    useTransactions();

  const handleEdit = (transaction) => {
    const newName = prompt(
      "Enter new customer name:",
      transaction.customerName,
    );
    if (!newName) return;

    updateTransaction({
      ...transaction,
      customerName: newName,
    });
  };
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [prevStatusFilter, setPrevStatusFilter] = useState(statusFilter);

  // Adjust state during render if props changed - React recommended pattern to avoid cascading effects
  if (searchQuery !== prevSearchQuery || statusFilter !== prevStatusFilter) {
    setPrevSearchQuery(searchQuery);
    setPrevStatusFilter(statusFilter);
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
          bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
          icon: <CheckCircle2 size={13} className="mr-1.5" />,
        };
      case "Pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-100",
          icon: <Clock size={13} className="mr-1.5" />,
        };
      case "Failed":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-100",
          icon: <AlertCircle size={13} className="mr-1.5" />,
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-100",
          icon: null,
        };
    }
  };

  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1 inline text-indigo-500" />
    ) : (
      <ChevronDown size={14} className="ml-1 inline text-indigo-500" />
    );
  };

  return (
    <Card className="shadow-sm overflow-hidden p-0 border-none bg-white rounded-4xl">
      {/* Table Header Section within Card */}
      <div className="flex items-center justify-between p-8 border-b border-gray-50 bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">
            Transaction History
          </h4>
          <span className="text-sm font-semibold text-gray-400">
            {filteredTransactions.length} results found for current filter
          </span>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 border-b border-gray-50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                ID
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Customer
              </th>
              <th
                className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100/50 transition-colors group"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date{" "}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {renderSortIndicator("date")}
                  </span>
                </div>
              </th>
              <th
                className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100/50 transition-colors group"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Amount{" "}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {renderSortIndicator("amount")}
                  </span>
                </div>
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-8 py-6">
                    <div className="h-4 bg-gray-100 rounded w-16"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-40"></div>
                      <div className="h-3 bg-gray-50 rounded w-24"></div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-7 bg-gray-100 rounded-full w-24"></div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="h-4 bg-gray-100 rounded w-12 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50/20">
                    <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center text-3xl mb-4 transform rotate-3">
                      🔍
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                      No results found
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 max-w-[250px] font-medium leading-relaxed">
                      Try adjusting your search terms or filters to find what
                      you're looking for.
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
                    className="hover:bg-indigo-50/20 transition-all duration-300 group"
                  >
                    <td className="px-8 py-5 text-xs font-black text-gray-400 font-mono tracking-tighter">
                      {transaction.id}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {transaction.customerName}
                        </span>
                        <span className="text-xs text-gray-400 font-semibold lowercase tracking-tight">
                          {transaction.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-gray-900 tabular-nums">
                      {transaction.amount}
                    </td>
                    <td className="px-8 py-5 text-right sm:text-left">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${statusConfig.bg}`}
                      >
                        {statusConfig.icon}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-500 hover:text-blue-700 text-[10px] font-black uppercase tracking-widest mr-4 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        Delete
                      </button>
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
        <div className="flex items-center justify-between p-8 bg-gray-50/30">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Page {safePage} of {totalPages}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-gray-600 hover:bg-gray-100 hover:border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Back
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-5 py-2 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              More
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TransactionsTable;
