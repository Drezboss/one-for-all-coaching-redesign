import { Loader2, Trophy } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "default" | "branded";
}

export function Loading({ size = "md", text, variant = "default" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "branded") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Trophy className={`${sizeClasses[size]} text-lfc-red animate-pulse`} />
          <Loader2 className={`${sizeClasses[size]} text-bright-red animate-spin absolute inset-0`} />
        </div>
        {text && (
          <p className={`${textSizes[size]} text-gray-300 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className={`${sizeClasses[size]} text-lfc-red animate-spin`} />
      {text && (
        <p className={`${textSizes[size]} text-gray-300 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} loading-spinner`}></div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-lfc-red rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-lfc-red rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-2 h-2 bg-lfc-red rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
    </div>
  );
}

export function LoadingBar() {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-lfc-red rounded-full animate-pulse" style={{
        animation: "loading-bar 2s ease-in-out infinite",
      }}></div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}