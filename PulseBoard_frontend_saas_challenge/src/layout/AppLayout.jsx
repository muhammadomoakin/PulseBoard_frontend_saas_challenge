import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0">
        <div className="h-16 flex items-center px-6 text-white font-bold text-xl border-b border-slate-800">
          PulseBoard
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            Transactions
          </Link>
          <Link
            to="/analytics"
            className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            Analytics
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">PulseBoard</h1>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">Logged In</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
