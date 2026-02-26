import React, { useState } from "react";
import { Container } from "../components/ui";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import SearchBar from "../components/dashboard/SearchBar";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Search and Filters Section */}
        <div className="w-full max-w-md">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Transactions Table Section */}
        <section>
          <TransactionsTable searchQuery={searchQuery} />
        </section>
      </div>
    </Container>
  );
};

export default Transactions;
