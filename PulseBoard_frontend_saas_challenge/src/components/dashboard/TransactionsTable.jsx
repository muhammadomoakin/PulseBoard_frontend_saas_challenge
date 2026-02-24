import React from "react";

const transactions = [
  {
    id: "TXN-101",
    customer: "Sarah Jenkins",
    email: "sarah.j@example.com",
    amount: "$450.00",
    status: "Completed",
    date: "Oct 24, 2023",
  },
  {
    id: "TXN-102",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    amount: "$1,200.00",
    status: "Pending",
    date: "Oct 23, 2023",
  },
  {
    id: "TXN-103",
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    amount: "$89.99",
    status: "Failed",
    date: "Oct 22, 2023",
  },
  {
    id: "TXN-104",
    customer: "James Rodriguez",
    email: "j.rod@example.com",
    amount: "$299.50",
    status: "Completed",
    date: "Oct 21, 2023",
  },
  {
    id: "TXN-105",
    customer: "Olivia Taylor",
    email: "olivia.t@example.com",
    amount: "$560.00",
    status: "Completed",
    date: "Oct 20, 2023",
  },
];

const TransactionsTable = () => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-900">
        Recent Transactions
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="px-4 py-4 text-sm font-medium text-slate-900">
                  {txn.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700">
                      {txn.customer}
                    </span>
                    <span className="text-xs text-slate-500">{txn.email}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{txn.date}</td>
                <td className="px-4 py-4 text-sm font-bold text-slate-900">
                  {txn.amount}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(txn.status)}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
