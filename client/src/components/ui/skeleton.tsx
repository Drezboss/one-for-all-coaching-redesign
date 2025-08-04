import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular"
  animation?: "pulse" | "wave" | "none"
  width?: string | number
  height?: string | number
}

function Skeleton({
  className,
  variant = "default",
  animation = "pulse",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = "bg-muted relative overflow-hidden"
  
  const variantClasses = {
    default: "rounded-md",
    text: "rounded-md h-4",
    circular: "rounded-full",
    rectangular: "rounded-none",
  }
  
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "skeleton-wave",
    none: "",
  }
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    >
      {animation === "wave" && (
        <div className="skeleton-wave-animation absolute inset-0" />
      )}
    </div>
  )
}

// Pre-built skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-4/5"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
  }
  
  return (
    <Skeleton
      variant="circular"
      className={sizeClasses[size]}
    />
  )
}

export function SkeletonButton({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-9 w-20",
    default: "h-10 w-28",
    lg: "h-11 w-32",
  }
  
  return (
    <Skeleton
      className={cn("rounded-md", sizeClasses[size])}
    />
  )
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full">
      <div className="flex space-x-4 mb-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 mb-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export { Skeleton }
