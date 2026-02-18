import React from "react";
import { Menu, Bell, Search, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg md:hidden text-slate-600"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold text-slate-800">PulseBoard</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:ring-0 text-sm w-64 ml-2 text-slate-600 outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">Premium Plan</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white ring-2 ring-slate-50 ring-offset-2">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
