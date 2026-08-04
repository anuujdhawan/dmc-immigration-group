import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "dark" | "outline" | "white" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-[0_8px_20px_rgba(53,142,26,0.25)]",
  dark: "bg-brand-950 text-white hover:bg-brand-900",
  outline:
    "border border-brand-600/40 bg-white text-brand-700 hover:border-brand-600 hover:bg-brand-50",
  white: "bg-white text-brand-800 hover:bg-brand-50 shadow-md",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
