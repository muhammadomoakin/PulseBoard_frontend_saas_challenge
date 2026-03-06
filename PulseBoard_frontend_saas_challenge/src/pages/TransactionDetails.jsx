import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionsContext";
import {
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  DollarSign,
  Calendar,
  Activity,
} from "lucide-react";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions } = useTransactions();

  const transaction = transactions.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transaction Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The transaction ID {id} does not exist in our records.
        </p>
        <button
          onClick={() => navigate("/transactions")}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Transactions
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Transaction Details
          </h1>
          <p className="text-gray-500 mt-1">
            Detailed overview of transaction {id}
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-full border text-sm font-semibold inline-flex items-center ${getStatusColor(transaction.status)}`}
        >
          <Activity className="w-4 h-4 mr-2" />
          {transaction.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-500" />
            Customer Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Name
              </label>
              <p className="text-lg font-medium text-gray-900">
                {transaction.customerName}
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                <Mail className="w-3 h-3 mr-1" /> Email
              </label>
              <p className="text-gray-700">{transaction.email}</p>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-indigo-500" />
            Transaction Info
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Amount
                </label>
                <div className="flex items-center text-2xl font-bold text-indigo-600">
                  <DollarSign className="w-6 h-6" />
                  {transaction.amount.replace("$", "")}
                </div>
              </div>
              <div className="text-right">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-end">
                  <Calendar className="w-3 h-3 mr-1" /> Date
                </label>
                <p className="text-gray-700 font-medium">{transaction.date}</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Reference ID
              </label>
              <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded border border-dashed border-gray-200 mt-1">
                {transaction.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Mockup / Timeline */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Activity Timeline
        </h3>
        <div className="relative pl-6 border-l-2 border-indigo-100 space-y-6">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white"></div>
            <p className="text-sm font-semibold text-gray-900">
              Transaction Created
            </p>
            <p className="text-xs text-gray-500">{transaction.date} 09:41 AM</p>
          </div>
          <div className="relative">
            <div
              className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white ${transaction.status === "Success" ? "bg-green-500" : transaction.status === "Failed" ? "bg-red-500" : "bg-yellow-500"}`}
            ></div>
            <p className="text-sm font-semibold text-gray-900">
              Status updated to: {transaction.status}
            </p>
            <p className="text-xs text-gray-500">{transaction.date} 09:42 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
