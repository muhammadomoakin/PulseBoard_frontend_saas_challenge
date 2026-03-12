import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Menu,
  X,
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

const AppLayout = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <Receipt size={20} />,
    },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div
      className={`flex h-screen overflow-hidden font-sans ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
        ${theme === "dark" ? "bg-slate-900 border-r border-slate-800" : "bg-slate-900 text-slate-300"}
      `}
      >
        <div
          className={`h-20 flex items-center justify-between px-8 text-white border-b ${theme === "dark" ? "border-slate-800" : "border-slate-800/50"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-xl font-black italic">P</span>
            </div>
            <span className="font-black text-2xl tracking-tight">
              PulseBoard
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-4">
            <p
              className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}
            >
              Main Menu
            </p>
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : theme === "dark"
                        ? "hover:bg-slate-800/50 hover:text-white text-slate-400"
                        : "hover:bg-slate-800/50 hover:text-white text-slate-400"
                  }
                `}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"} transition-colors`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-bold text-sm tracking-tight">
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <ChevronRight size={16} className="text-white/50" />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-6 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-800/50"}`}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-4 py-4 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 font-black text-xs uppercase tracking-widest group"
          >
            <LogOut
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <header
          className={`h-20 backdrop-blur-md border-b flex items-center justify-between px-6 sm:px-10 sticky top-0 z-30 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white/80 border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1
                className={`text-xl font-black tracking-tight lg:block hidden ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Dashboard
              </h1>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest lg:hidden">
                PulseBoard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center border ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-50"
              }`}
              title={
                theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div
              className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border transition-all hover:scale-105 ${
                theme === "dark"
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-emerald-50"
              }`}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${
                  theme === "dark" ? "text-emerald-400" : "text-emerald-700"
                }`}
              >
                System Online
              </span>
            </div>

            <div
              className={`w-10 h-10 rounded-full border-2 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-white"
              }`}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 custom-scrollbar ${
            theme === "dark" ? "bg-slate-950" : "bg-slate-50"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
