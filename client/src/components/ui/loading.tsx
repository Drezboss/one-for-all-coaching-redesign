import { motion } from "framer-motion";
import { Loader2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "brand";
  className?: string;
  text?: string;
}

export function Loading({ 
  size = "md", 
  variant = "spinner", 
  className,
  text 
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "brand") {
    return (
      <div className={cn("flex flex-col items-center justify-center", className)}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Trophy className={cn("text-lfc-red", sizeClasses[size])} />
        </motion.div>
        {text && (
          <motion.p 
            className={cn("text-muted-foreground", textSizes[size])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary rounded-full", sizeClasses[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {text && (
          <motion.span 
            className={cn("ml-3 text-muted-foreground", textSizes[size])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
          </motion.span>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <motion.div
          className={cn("bg-primary rounded-full", sizeClasses[size])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {text && (
          <motion.span 
            className={cn("ml-3 text-muted-foreground", textSizes[size])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
          </motion.span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn("text-primary", sizeClasses[size])} />
      </motion.div>
      {text && (
        <motion.span 
          className={cn("ml-3 text-muted-foreground", textSizes[size])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}

// Page loading component
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading 
        variant="brand" 
        size="lg" 
        text="Loading..." 
        className="space-y-4"
      />
    </div>
  );
}

// Section loading component
export function SectionLoading() {
  return (
    <div className="py-12 flex items-center justify-center">
      <Loading 
        variant="dots" 
        size="md" 
        text="Loading content..." 
      />
    </div>
  );
}

// Button loading component
export function ButtonLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <Loading 
      variant="spinner" 
      size="sm" 
      text={text} 
      className="inline-flex"
    />
  );
}

// Card loading component
export function CardLoading() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
      </div>
    </div>
  );
}