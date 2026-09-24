import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button eyebrow inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent whitespace-nowrap transition-colors duration-200 ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: charcoal fill, sepia on hover (the one accent, on intent).
        default:
          "bg-primary text-primary-foreground hover:bg-sepia hover:text-sepia-foreground",
        // Secondary: hairline frame, fills on hover.
        outline:
          "border-foreground/40 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:text-sepia",
        destructive:
          "border-destructive text-destructive hover:bg-destructive hover:text-background",
        link: "px-0 text-foreground underline underline-offset-[0.5em] decoration-border hover:decoration-sepia hover:text-sepia",
      },
      size: {
        default: "h-11 px-6",
        xs: "h-8 px-3",
        sm: "h-10 px-5",
        lg: "h-14 px-9",
        icon: "size-11",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
