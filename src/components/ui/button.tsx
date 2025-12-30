import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary hover:shadow-glow hover:scale-105 hover:-rotate-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline:
          "border-2 border-primary/30 bg-card hover:bg-primary/10 hover:border-primary hover:scale-105 hover:rotate-1",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-secondary hover:scale-105",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        fun: "bg-gradient-primary text-primary-foreground hover:scale-110 hover:-rotate-2 shadow-primary hover:shadow-glow font-lilita tracking-wide",
        morning: "bg-gradient-morning text-foreground hover:scale-110 hover:rotate-2 shadow-fun font-lilita tracking-wide",
        night: "bg-gradient-night text-primary-foreground hover:scale-110 hover:-rotate-2 shadow-bubbly font-lilita tracking-wide",
        rainbow: "bg-gradient-rainbow text-primary-foreground hover:scale-110 shadow-glow animate-pulse-glow font-lilita tracking-wide",
        celebration: "bg-gradient-celebration text-primary-foreground hover:animate-celebrate shadow-fun font-lilita tracking-wide",
        bubbly: "bg-gradient-bubbly text-foreground border-2 border-primary/20 hover:scale-110 hover:rotate-1 shadow-bubbly font-nunito",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-sm",
        lg: "h-14 rounded-2xl px-10 text-lg",
        xl: "h-18 rounded-3xl px-14 text-xl",
        icon: "h-12 w-12 rounded-2xl",
        big: "h-24 w-24 rounded-[2rem] text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
