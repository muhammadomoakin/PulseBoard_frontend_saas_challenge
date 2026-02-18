import React from "react";

/**
 * Reusable Button component with primary and secondary variants.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary'} props.variant - The visual style of the button.
 * @param {string} props.className - Additional Tailwind classes.
 * @param {React.ReactNode} props.children - Button content.
 */
const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent shadow-sm focus:ring-indigo-500",
    secondary:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm focus:ring-gray-200",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
