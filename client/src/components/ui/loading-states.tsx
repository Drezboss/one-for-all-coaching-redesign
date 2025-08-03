import { Trophy, Wifi, WifiOff } from "lucide-react";
import { Card } from "./card";

// Branded Loading Spinner
export function LoadingSpinner({ size = "md", text }: { size?: "sm" | "md" | "lg"; text?: string }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-700 border-t-lfc-red`} />
        <Trophy className={`absolute inset-0 m-auto w-1/2 h-1/2 text-lfc-red animate-pulse`} />
      </div>
      {text && <p className="text-gray-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="bg-almost-black border-gray-700 p-12">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {icon && (
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {description && <p className="text-gray-400 max-w-sm">{description}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </Card>
  );
}

// Skeleton Loaders
export function SkeletonCard() {
  return (
    <Card className="bg-almost-black border-gray-700 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-full"></div>
        <div className="h-3 bg-gray-800 rounded w-5/6"></div>
        <div className="flex space-x-2 mt-4">
          <div className="h-8 bg-gray-800 rounded w-20"></div>
          <div className="h-8 bg-gray-800 rounded w-20"></div>
        </div>
      </div>
    </Card>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-almost-black rounded border border-gray-800">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-3 bg-gray-800 rounded animate-pulse"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Offline State Indicator
export function OfflineIndicator() {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg flex items-center space-x-3">
      <WifiOff className="w-5 h-5 text-yellow-500" />
      <div>
        <p className="text-white font-medium">You're offline</p>
        <p className="text-gray-400 text-sm">Some features may be limited</p>
      </div>
    </div>
  );
}