import { motion } from "framer-motion";
import { Loader2, Trophy } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "pulse" | "dots" | "branded";
  text?: string;
  className?: string;
}

export function Loading({ 
  size = "md", 
  variant = "spinner", 
  text, 
  className = "" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "spinner") {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <Loader2 className={`${sizeClasses[size]} animate-spin text-lfc-red`} />
        {text && (
          <p className={`${textSizeClasses[size]} text-gray-300 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} bg-lfc-red rounded-full`}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {text && (
          <p className={`${textSizeClasses[size]} text-gray-300 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 bg-lfc-red rounded-full`}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.1
              }}
            />
          ))}
        </div>
        {text && (
          <p className={`${textSizeClasses[size]} text-gray-300 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "branded") {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-lfc-red to-bright-red rounded-xl flex items-center justify-center shadow-lg`}>
            <Trophy className="w-1/2 h-1/2 text-white" />
          </div>
        </motion.div>
        {text && (
          <p className={`${textSizeClasses[size]} text-gray-300 font-medium text-center`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return null;
}

// Loading Skeleton Component
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

// Card Skeleton Component
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse p-6 border border-gray-700 rounded-2xl bg-gray-900/50 ${className}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="mt-6">
        <div className="h-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loading 
        variant="branded" 
        size="lg" 
        text="Loading One For All Coaching..." 
        className="p-8"
      />
    </div>
  );
}

// Button Loading State
interface ButtonLoadingProps {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function ButtonWithLoading({ 
  isLoading = false, 
  children, 
  className = "",
  disabled = false,
  onClick,
  ...props 
}: ButtonLoadingProps) {
  return (
    <button
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${
        isLoading ? 'cursor-not-allowed opacity-75' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
}