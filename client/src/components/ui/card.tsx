import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "elevated" | "interactive"
  asMotion?: boolean
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant = "default", asMotion = false, ...props }, ref) => {
  const variantClasses = {
    default: "rounded-lg border bg-card text-card-foreground shadow-sm",
    outline: "rounded-lg border-2 bg-transparent",
    elevated: "rounded-lg bg-card text-card-foreground shadow-lg",
    interactive: "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
  }

  if (asMotion) {
    return (
      <motion.div
        ref={ref}
        className={cn(variantClasses[variant], className)}
        whileHover={variant === "interactive" ? { scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...(props as HTMLMotionProps<"div">)}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// New enhanced card variants for specific use cases
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg backdrop-blur-md bg-card/60 border border-border/50 shadow-xl",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const HoverCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      "hover:shadow-xl transition-shadow duration-300",
      className
    )}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    {...props}
  >
    {children}
  </motion.div>
))
HoverCard.displayName = "HoverCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, GlassCard, HoverCard }
