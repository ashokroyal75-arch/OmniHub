import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring w-full rounded-md border border-slate-light/50 bg-paper px-3 py-2 text-sm placeholder:text-slate-light",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
