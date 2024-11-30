import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:outline-none ring-offset-background", 
  {
    variants: {
      color: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "bg-success text-success-foreground hover:bg-success/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        secondary: "bg-secondary text-muted-foreground dark:text-default-950 hover:bg-secondary/80",
        dark: "bg-accent-foreground text-accent hover:bg-accent-foreground/80",
      },
      variant: {
        solid: "",
        outline: "border border-current bg-transparent",
        ghost: "bg-transparent text-current",
        soft: "bg-opacity-10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "destructive",
        className: "text-destructive hover:bg-destructive hover:border-destructive",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-success hover:text-success-foreground",
      },
      // Add more as needed...
    ],
    defaultVariants: {
      color: "default",
      variant: "solid",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    { className, variant, size, color, asChild = false, children, ...props },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(buttonVariants({ variant, size, color }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
