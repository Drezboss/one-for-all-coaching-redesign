import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-navy to-almost-black"></div>
      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-20 w-full mb-6" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-10 w-2/3 mb-10" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40" />
            <Skeleton className="h-14 w-40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-8 shadow-lg">
      <Skeleton className="h-12 w-12 rounded-full mb-6" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-20 w-full mb-6" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Skeleton className="h-10 w-40" />
          <div className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="md:hidden">
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="pt-4">
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </div>
  );
}