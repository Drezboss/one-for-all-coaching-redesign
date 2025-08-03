import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "skeleton"
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  className?: string
}

export function Loading({ variant = "spinner", size = "md", text, className }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const containerClasses = "flex flex-col items-center justify-center space-y-4";

  switch (variant) {
    case "spinner":
      return (
        <div className={cn(containerClasses, className)}>
          <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
      );

    case "dots":
      return (
        <div className={cn(containerClasses, className)}>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {text && <p className="text-sm text-muted-foreground mt-2">{text}</p>}
        </div>
      );

    case "pulse":
      return (
        <div className={cn(containerClasses, className)}>
          <motion.div
            className={cn("bg-primary rounded-full", sizeClasses[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
      );

    case "skeleton":
      return (
        <div className={cn("space-y-4", className)}>
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
        </div>
      );

    default:
      return null;
  }
}

// Full page loading component
export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loading variant="spinner" size="lg" text={text} />
    </motion.div>
  );
}

// Loading overlay for sections
export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
      <Loading variant="spinner" size="md" text={text} />
    </div>
  );
}

// Inline loading for buttons or small areas
export function InlineLoading({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
  );
}

// Loading card placeholder
export function LoadingCard() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="skeleton h-9 w-20 rounded-md" />
        <div className="skeleton h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}