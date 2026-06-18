import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 border border-transparent",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-accent/60 hover:text-accent",
  ghost: "bg-transparent text-muted hover:text-foreground border border-transparent",
};

export function buttonVariants(variant: ButtonVariant = "primary") {
  return cn(
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant]
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants(variant), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
