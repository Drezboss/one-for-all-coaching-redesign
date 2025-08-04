import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  count = 1,
  ...props
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700";
  
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
    card: "rounded-lg"
  };

  const skeletonStyle = {
    width: width || (variant === "circular" ? "40px" : "100%"),
    height: height || (variant === "circular" ? "40px" : variant === "card" ? "200px" : "16px")
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(baseClasses, variantClasses[variant], className)}
          style={skeletonStyle}
          {...props}
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg p-6 space-y-4">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" count={2} className="mb-2" />
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-card rounded-lg">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}