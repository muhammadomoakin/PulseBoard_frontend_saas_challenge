import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-700 font-bold text-xl uppercase tracking-wider">
          PulseBoard
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-4">
            <div className="h-10 bg-slate-800 rounded-md opacity-40"></div>
            <div className="h-10 bg-slate-800 rounded-md opacity-40"></div>
            <div className="h-10 bg-slate-800 rounded-md opacity-40"></div>
            <div className="h-10 bg-slate-800 rounded-md opacity-40"></div>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="h-10 bg-slate-800 rounded-md opacity-40"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Placeholder */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 flex-shrink-0">
          <div className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-32 bg-gray-100 rounded-lg"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
