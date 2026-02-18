import React from "react";

/**
 * Reusable Container component for layout consistency.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Container content.
 * @param {string} props.className - Additional Tailwind classes.
 */
const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
