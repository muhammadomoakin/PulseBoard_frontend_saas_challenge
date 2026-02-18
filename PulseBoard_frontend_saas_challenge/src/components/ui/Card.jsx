import React from "react";

/**
 * Reusable Card component for dashboard content.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content.
 * @param {string} props.className - Additional Tailwind classes.
 */
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
