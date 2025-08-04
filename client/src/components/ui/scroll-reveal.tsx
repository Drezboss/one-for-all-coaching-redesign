import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "rotate";
  duration?: number;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  animation = "fadeIn",
  duration = 800,
  delay = 0,
  threshold = 0.1
}: ScrollRevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true
  });

  const animations = {
    fadeIn: {
      initial: "opacity-0",
      animate: "opacity-100"
    },
    slideUp: {
      initial: "opacity-0 translate-y-10",
      animate: "opacity-100 translate-y-0"
    },
    slideDown: {
      initial: "opacity-0 -translate-y-10",
      animate: "opacity-100 translate-y-0"
    },
    slideLeft: {
      initial: "opacity-0 translate-x-10",
      animate: "opacity-100 translate-x-0"
    },
    slideRight: {
      initial: "opacity-0 -translate-x-10",
      animate: "opacity-100 translate-x-0"
    },
    scale: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100"
    },
    rotate: {
      initial: "opacity-0 rotate-12",
      animate: "opacity-100 rotate-0"
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isIntersecting ? selectedAnimation.animate : selectedAnimation.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {children}
    </div>
  );
}