import React from "react";
import { Search } from "lucide-react";

/**
 * SearchBar Component
 * A reusable, modern search input component for the PulseBoard dashboard.
 *
 * Features:
 * - Managed state for input value
 * - Lucide Search icon
 * - Responsive, modern SaaS design
 * - Focus-within ring for improved UX
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full group">
      <div className="bg-gray-50/50 hover:bg-white focus-within:bg-white shadow-none focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-5 py-3.5 flex items-center border border-gray-100 focus-within:border-indigo-500 transition-all duration-300">
        {/* Search Icon */}
        <Search className="w-5 h-5 text-gray-400 mr-4 shrink-0 group-focus-within:text-indigo-600 transition-colors" />

        {/* Search Input */}
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-semibold text-sm tracking-tight"
          placeholder="Search items, users, or records..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
