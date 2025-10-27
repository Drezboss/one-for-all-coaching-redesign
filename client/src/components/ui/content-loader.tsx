import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface ContentLoaderProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingMessage?: string;
  className?: string;
}

/**
 * ContentLoader - A reusable component for handling loading states and errors
 * when loading content from markdown/JSON files
 */
export function ContentLoader({
  loading,
  error,
  children,
  onRetry,
  loadingMessage = "Loading content...",
  className = "",
}: ContentLoaderProps) {
  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-lfc-red" />
          <p className="text-gray-300 text-lg">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center max-w-md">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Unable to Load Content
          </h3>
          <p className="text-gray-300 mb-4">{error}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-lfc-red hover:bg-bright-red text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Inline ContentLoader for smaller loading states
 */
export function InlineContentLoader({
  loading,
  error,
  children,
  onRetry,
  loadingText = "Loading...",
}: {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingText?: string;
}) {
  if (loading) {
    return (
      <span className="inline-flex items-center text-gray-300">
        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
        {loadingText}
      </span>
    );
  }

  if (error) {
    return (
      <span className="inline-flex items-center text-red-400">
        <AlertCircle className="w-4 h-4 mr-2" />
        Error loading content
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-2 text-lfc-red hover:text-bright-red underline"
          >
            retry
          </button>
        )}
      </span>
    );
  }

  return <>{children}</>;
}

/**
 * Skeleton component for content that's loading
 */
export function ContentSkeleton({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-700 rounded h-4 mb-3 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}