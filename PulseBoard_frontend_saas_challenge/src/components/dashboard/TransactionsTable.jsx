import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Mail,
  Calendar as CalendarIcon,
  Trash2,
  Edit2,
} from "lucide-react";
import { Card } from "../ui";
import { useTransactions } from "../../context/TransactionsContext";

const TransactionsTable = ({ searchQuery = "", statusFilter = "All" }) => {
  const { transactions, deleteTransaction, updateTransaction } =
    useTransactions();
  const navigate = useNavigate();

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

  const handleDelete = (transaction) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete transaction ${transaction.id}?`,
    );

    if (!confirmDelete) return;

    deleteTransaction(transaction.id);
  };

  const handleRowClick = (transaction) => {
    navigate(`/transactions/${transaction.id}`);
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

  const safePage = Math.min(currentPage, totalPages);

  const paginatedTransactions = sortedTransactions.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage,
  );

  const getStatusConfig = (status) => {
    switch (status) {
      case "Success":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
          icon: <CheckCircle2 size={13} className="mr-1.5" />,
          dot: "bg-emerald-500",
        };
      case "Pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-100",
          icon: <Clock size={13} className="mr-1.5" />,
          dot: "bg-amber-500",
        };
      case "Failed":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-100",
          icon: <AlertCircle size={13} className="mr-1.5" />,
          dot: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-100",
          icon: null,
          dot: "bg-slate-400",
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
    <Card className="shadow-2xl shadow-slate-200/50 overflow-hidden p-0 border-none bg-white rounded-3xl">
      {/* Table Header Section within Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-20 gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em]">
            Ledger Activity
          </h4>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
            Live Updates
          </span>
        </div>
      </div>

      <div className="px-6 sm:px-8 mb-4">
        <p className="text-sm text-gray-500">
          {searchQuery
            ? `Showing ${filteredTransactions.length} of ${transactions.length} transactions`
            : `Showing ${transactions.length} transactions`}
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full no-scrollbar">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="hidden lg:table-cell px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Identifier No.
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Entity Details
              </th>
              <th
                className="hidden sm:table-cell px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-100/50 transition-colors group"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Timestamp{" "}
                  <span className="ml-1">{renderSortIndicator("date")}</span>
                </div>
              </th>
              <th
                className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-100/50 transition-colors group"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Volume{" "}
                  <span className="ml-1">{renderSortIndicator("amount")}</span>
                </div>
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="hidden lg:table-cell px-8 py-6">
                    <div className="h-4 bg-slate-100 rounded-lg w-16"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-100 rounded-lg w-40"></div>
                      <div className="h-3 bg-slate-50 rounded-lg w-24"></div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-8 py-6">
                    <div className="h-4 bg-slate-100 rounded-lg w-24"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-4 bg-slate-100 rounded-lg w-20"></div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-7 bg-slate-100 rounded-full w-24"></div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="h-4 bg-slate-100 rounded-lg w-8 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                    {transactions.length > 0 ? (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          No transactions found for '{searchQuery}'
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-[280px] mx-auto font-bold leading-relaxed">
                          Modify your search criteria or filter parameters to
                          broaden the result set.
                        </p>
                      </div>
                    ) : (
                      <div className="animate-in zoom-in-50 duration-500">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner mx-auto">
                          �
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          Zero results located
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-[280px] mx-auto font-bold leading-relaxed">
                          Your ledger is currently empty. Add your first
                          transaction to get started.
                        </p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((transaction) => {
                const statusConfig = getStatusConfig(transaction.status);
                return (
                  <tr
                    key={transaction.id}
                    onClick={() => handleRowClick(transaction)}
                    className="cursor-pointer hover:bg-gray-50 transition duration-300 group"
                  >
                    <td className="hidden lg:table-cell px-8 py-6 text-[10px] font-black text-slate-400 font-mono tracking-tighter">
                      {transaction.id}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {transaction.customerName}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold lowercase">
                          <Mail size={12} className="text-slate-300" />
                          <span>{transaction.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-600">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          <CalendarIcon size={10} />
                          <span>Standardized</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-slate-900 tabular-nums bg-slate-50 inline-block px-2.5 py-1 rounded-lg border border-slate-100">
                        {transaction.amount}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${statusConfig.bg}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${statusConfig.dot}`}
                        ></span>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(transaction);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors group/edit"
                          title="Edit Entity"
                        >
                          <Edit2
                            size={16}
                            className="group-hover/edit:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(transaction);
                          }}
                          className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors group/del"
                          title="Purge Entry"
                        >
                          <Trash2
                            size={16}
                            className="group-hover/del:scale-110 transition-transform"
                          />
                        </button>
                      </div>
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
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-slate-50/50 gap-4 border-t border-slate-100">
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Page <span className="text-indigo-600">{safePage}</span> of{" "}
            <span className="text-slate-900">{totalPages}</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
            >
              Back
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-600/20"
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
