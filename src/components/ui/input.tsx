import * as React from "react"
import { cn } from "cn"

// Underline-only field: no box, no radius. Edge is --input (>= 3:1).
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-sepia focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
