/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { transactions as mockTransactions } from "../data/transactions";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  // Helper to ensure transactions are in sequential ID order TRX-001, TRX-002...
  // This logic assumes the array passed in is Newest to Oldest
  const resequence = (data) => {
    const total = data.length;
    return data.map((tx, index) => ({
      ...tx,
      // Newest (index 0) gets the highest ID (total)
      // Oldest (index total-1) gets the lowest ID (1)
      id: `TRX-${(total - index).toString().padStart(3, "0")}`,
    }));
  };

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      const initialData = saved ? JSON.parse(saved) : mockTransactions;
      // We assume mock data and saved data might be oldest first or random
      // Let's sort initial data by date before resequencing to be sure
      const sortedData = [...initialData].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      return resequence(sortedData);
    } catch (error) {
      console.error("Error parsing transactions from localStorage:", error);
      const sortedMock = [...mockTransactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      return resequence(sortedMock);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions to localStorage:", error);
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => {
      // Prepend the new transaction (Newest First)
      const newTransactions = [transaction, ...prev];
      // Resequence ensures the new one gets the highest ID
      return resequence(newTransactions);
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
};
