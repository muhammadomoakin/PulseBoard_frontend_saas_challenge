import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <FolderKanban size={20} />, label: "Projects", href: "/projects" },
    { icon: <BarChart3 size={20} />, label: "Analytics", href: "/analytics" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-slate-900 text-slate-300 w-64 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            PulseBoard
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 relative overflow-hidden group
                ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }
              `}
            >
              {/* Active Indicator Bar */}
              {({ isActive }) => (
                <>
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full transition-transform duration-200 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <span
                    className={`${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-100"}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Bottom Section */}
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800/50 hover:text-slate-100 transition-all duration-200 text-slate-400 group">
            <LogOut size={20} className="group-hover:text-slate-100" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
