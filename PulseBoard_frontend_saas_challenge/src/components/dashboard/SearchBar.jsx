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
    <div className="w-full">
      <div className="bg-white shadow-sm rounded-xl px-4 py-3 flex items-center border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
        {/* Search Icon */}
        <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />

        {/* Search Input */}
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm md:text-base"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
