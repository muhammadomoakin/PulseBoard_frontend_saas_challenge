import React, { useState, useEffect } from "react";
import { Container } from "../components/ui";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import SearchBar from "../components/dashboard/SearchBar";
import { Loader2 } from "lucide-react";
import { transactions } from "../data/transactions";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <header>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            All Transactions
          </h2>
          <p className="text-gray-500 mt-2">
            View and manage your entire transaction history with filters and
            search.
          </p>
        </header>

        {/* Search and Filters Section - Only show if transactions exist */}
        {transactions.length > 0 && (
          <div className="w-full max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        )}

        {/* Transactions Table Section */}
        <section className="min-h-[400px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <div className="absolute inset-0 blur-xl bg-blue-400/20 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-medium text-gray-600 animate-pulse">
                Loading transactions...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-gray-200 text-center animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900">
                No transactions yet
              </h3>
              <p className="text-gray-500 mt-2">
                Start by adding your first transaction.
              </p>
            </div>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TransactionsTable searchQuery={searchQuery} />
            </div>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Transactions;
