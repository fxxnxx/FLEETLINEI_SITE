import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function GlassButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: GlassButtonProps) {
  const variants = {
    primary: {
      background: "rgba(208, 203, 174, 0.2)",
      border: "1px solid rgba(208, 203, 174, 0.3)",
      boxShadow:
        "0 8px 32px 0 rgba(208, 203, 174, 0.2), inset 0 1px 0 0 rgba(208, 203, 174, 0.4)",
      color: "#d0cbae",
    },
    secondary: {
      background: "rgba(115, 106, 57, 0.2)",
      border: "1px solid rgba(115, 106, 57, 0.3)",
      boxShadow:
        "0 8px 32px 0 rgba(115, 106, 57, 0.2), inset 0 1px 0 0 rgba(115, 106, 57, 0.4)",
      color: "#edece7",
    },
    accent: {
      background: "rgba(194, 181, 112, 0.2)",
      border: "1px solid rgba(194, 181, 112, 0.3)",
      boxShadow:
        "0 8px 32px 0 rgba(194, 181, 112, 0.3), inset 0 1px 0 0 rgba(194, 181, 112, 0.4)",
      color: "#c2b570",
    },
    outline: {
      background: "rgba(7, 7, 5, 0.4)",
      border: "1px solid rgba(208, 203, 174, 0.2)",
      boxShadow:
        "0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(208, 203, 174, 0.1)",
      color: "#edece7",
    },
  };

  const style = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        ...style,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {children}
    </button>
  );
}