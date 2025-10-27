import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  animation?: "pulse" | "bounce" | "shake" | "glow" | "slide";
  animateOnHover?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animation = "pulse", animateOnHover = true, children, ...props }, ref) => {
    const animationClasses = {
      pulse: "hover:animate-pulse",
      bounce: "hover:animate-bounce",
      shake: "hover:animate-shake",
      glow: "hover:shadow-glow",
      slide: "group overflow-hidden"
    };

    const baseClasses = cn(
      "relative transition-all duration-300 transform",
      "hover:scale-105 active:scale-95",
      "hover:shadow-lg",
      animateOnHover && animationClasses[animation],
      className
    );

    if (animation === "slide") {
      return (
        <Button ref={ref} className={baseClasses} {...props}>
          <span className="relative z-10">{children}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        </Button>
      );
    }

    return (
      <Button ref={ref} className={baseClasses} {...props}>
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };