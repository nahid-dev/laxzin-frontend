
export default function Button({
  as: Component = "button",
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) {
  const baseClasses =
    "font-light tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary:
      "bg-white text-black border border-black hover:bg-black hover:text-white",
    outline:
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };

  const sizes = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
